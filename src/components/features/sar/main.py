from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Dict, Tuple, Optional, List
from drift_engine import BayesianDriftEngine
from mission_planner import MissionPlanner
from scenario_library import ScenarioLibrary, SARScenario

app = FastAPI(
    title="AeroSAR: Probabilistic Command & Control",
    version="2.0.0",
    description="Agentic Decision Support System for Maritime Search and Rescue Operations"
)

# CORS middleware for frontend integration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize engines
drift_engine = BayesianDriftEngine(iterations=10000)
mission_planner = MissionPlanner()

class DriftRequest(BaseModel):
    lkp: Tuple[float, float]
    wind: Dict[str, float]
    current: Dict[str, float]
    hours: float
    craft_type: str = "life_raft"

class ScenarioRequest(BaseModel):
    scenario_id: str  # 'north_sea', 'mediterranean', 'atlantic'

@app.get("/")
async def root():
    return {
        "service": "AeroSAR: Bayesian SAR Orchestrator",
        "status": "operational",
        "capabilities": ["drift_simulation", "mission_planning", "scenario_stress_testing"]
    }

@app.post("/simulate/drift")
async def simulate_drift(request: DriftRequest):
    """
    Triggers Monte Carlo Markov Chain simulation for stochastic drift inference.
    
    Returns: Probability heatmap and SAR deployment recommendations.
    """
    try:
        # 1. Execute Bayesian drift engine
        results = drift_engine.calculate_drift(
            lkp=request.lkp,
            wind=request.wind,
            current=request.current,
            hours=request.hours
        )
        
        # 2. Extract statistical metrics
        stats = drift_engine.get_search_area_stats(results)
        
        # 3. Generate mission plan
        recommendation = mission_planner.plan_mission(
            latitudes=results['latitude'].values,
            longitudes=results['longitude'].values,
            weights=results['weight'].values
        )
        
        return {
            "status": "success",
            "search_center": {
                "lat": stats["mean_lat"],
                "lon": stats["mean_lon"]
            },
            "reliability": {
                "confidence_radius_nm": stats["confidence_radius_95"],
                "distribution_variance": stats["std_dev_nm"]
            },
            "mission_plan": {
                "optimal_pattern": recommendation.optimal_pattern,
                "rationale": recommendation.rationale,
                "asset_allocation": recommendation.asset_allocation,
                "critical_path": [
                    {"lat": cell.center_lat, "lon": cell.center_lon, "priority": cell.priority}
                    for cell in recommendation.critical_path[:5]
                ],
                "estimated_coverage_hours": recommendation.estimated_coverage_time_hours
            }
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/simulate/scenario")
async def run_scenario(request: ScenarioRequest):
    """
    Executes a predefined high-stakes operational scenario.
    
    Returns: Complete mission analysis including environmental forcing and recommendations.
    """
    try:
        # Load scenario
        if request.scenario_id == 'north_sea':
            scenario = ScenarioLibrary.north_sea_grounding()
        elif request.scenario_id == 'mediterranean':
            scenario = ScenarioLibrary.mediterranean_multi_lkp()
        elif request.scenario_id == 'atlantic':
            scenario = ScenarioLibrary.atlantic_deep_water()
        else:
            raise HTTPException(status_code=400, detail="Invalid scenario ID")
        
        # Run drift simulation
        results = drift_engine.calculate_drift(
            lkp=scenario.lkp,
            wind={'speed': scenario.environment.wind_speed, 'direction': scenario.environment.wind_direction},
            current={'speed': scenario.environment.current_speed, 'direction': scenario.environment.current_direction},
            hours=scenario.hours_elapsed
        )
        
        # Generate mission plan
        stats = drift_engine.get_search_area_stats(results)
        recommendation = mission_planner.plan_mission(
            latitudes=results['latitude'].values,
            longitudes=results['longitude'].values,
            weights=results['weight'].values
        )
        
        return {
            "scenario": {
                "id": scenario.scenario_id,
                "name": scenario.name,
                "description": scenario.description,
                "objective": scenario.objective
            },
            "environmental_forcing": {
                "wind_speed_kts": scenario.environment.wind_speed,
                "sea_state": scenario.environment.sea_state,
                "visibility": scenario.environment.visibility
            },
            "results": {
                "search_center_lat": stats["mean_lat"],
                "search_center_lon": stats["mean_lon"],
                "confidence_radius_nm": stats["confidence_radius_95"],
                "optimal_pattern": recommendation.optimal_pattern,
                "recommended_assets": recommendation.asset_allocation
            }
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/scenarios/list")
async def list_scenarios():
    """Returns all available operational stress test scenarios."""
    scenarios = ScenarioLibrary.get_all_scenarios()
    return {
        "scenarios": [
            {
                "id": s.scenario_id,
                "name": s.name,
                "description": s.description
            } for s in scenarios
        ]
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)

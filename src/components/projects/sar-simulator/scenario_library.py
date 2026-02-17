"""
IAMSAR-Compliant Scenario Library for Maritime SAR Operations.

This module defines three high-stakes operational scenarios that demonstrate
the Bayesian SAR Orchestrator's capacity to handle diverse maritime emergencies.
"""

from typing import Dict, List, Tuple
from dataclasses import dataclass

@dataclass
class EnvironmentalConditions:
    """Environmental forcing parameters for SAR simulation."""
    wind_speed: float  # knots
    wind_direction: float  # degrees from North
    current_speed: float  # knots
    current_direction: float  # degrees to North
    sea_state: int  # Douglas Scale (0-9)
    visibility: str  # 'low', 'medium', 'high'
    water_temp: float  # Celsius

@dataclass
class CraftCharacteristics:
    """Maritime survival craft specifications."""
    craft_type: str  # 'life_raft_6', 'open_lifeboat', 'debris'
    leeway_slope: float  # Percentage of wind speed
    leeway_offset: float  # Baseline drift (knots)
    sea_anchor_deployed: bool

@dataclass
class SARScenario:
    """Complete SAR mission parameters."""
    scenario_id: str
    name: str
    description: str
    lkp: Tuple[float, float]  # Last Known Position (Lat, Lon)
    lkp_uncertainty_nm: float  # Nautical Miles
    environment: EnvironmentalConditions
    craft: CraftCharacteristics
    hours_elapsed: float
    objective: str
    
class ScenarioLibrary:
    """Repository of predefined high-fidelity SAR scenarios."""
    
    @staticmethod
    def north_sea_grounding() -> SARScenario:
        """
        Scenario A: North Sea Grounding Incident
        
        Context: LNG carrier grounding at 0200h UTC with immediate evacuation.
        Challenge: Gale-force winds, strong tidal currents, low visibility.
        Objective: Minimize Time-to-Recovery under extreme forcing.
        """
        return SARScenario(
            scenario_id="NORTH_SEA_001",
            name="North Sea High-Wind Evacuation",
            description="LNG carrier reef contact with crew abandonment during gale. High environmental forcing with significant positional uncertainty.",
            lkp=(54.30, 3.15),  # North Sea coordinates
            lkp_uncertainty_nm=2.5,
            environment=EnvironmentalConditions(
                wind_speed=35.0,
                wind_direction=270,  # West wind
                current_speed=2.8,
                current_direction=45,  # NE tidal current
                sea_state=6,  # Very Rough
                visibility='low',
                water_temp=8.0
            ),
            craft=CraftCharacteristics(
                craft_type='life_raft_6',
                leeway_slope=0.035,  # 3.5% of wind speed
                leeway_offset=0.03,
                sea_anchor_deployed=True
            ),
            hours_elapsed=4.0,
            objective="Minimize search window through high-confidence grid prioritization"
        )
    
    @staticmethod
    def mediterranean_multi_lkp() -> SARScenario:
        """
        Scenario B: Mediterranean Multi-Report Disambiguation
        
        Context: Multiple conflicting position reports from passing vessels.
        Challenge: Low wind, high traffic density, thermal stratification.
        Objective: Bayesian fusion of multiple LKP estimates.
        """
        return SARScenario(
            scenario_id="MED_TRAFFIC_002",
            name="Mediterranean LKP Disambiguation",
            description="Multiple conflicting position reports in high-traffic corridor. Low environmental forcing but high observational noise.",
            lkp=(38.45, 15.20),  # Mediterranean Sea
            lkp_uncertainty_nm=5.0,  # High due to conflicting reports
            environment=EnvironmentalConditions(
                wind_speed=12.0,
                wind_direction=135,  # SE wind
                current_speed=0.8,
                current_direction=90,  # East current
                sea_state=3,  # Slight
                visibility='high',
                water_temp=18.0
            ),
            craft=CraftCharacteristics(
                craft_type='open_lifeboat',
                leeway_slope=0.025,
                leeway_offset=0.02,
                sea_anchor_deployed=False
            ),
            hours_elapsed=6.0,
            objective="Disambiguate LKP via probability mass concentration analysis"
        )
    
    @staticmethod
    def atlantic_deep_water() -> SARScenario:
        """
        Scenario C: Atlantic Structural Failure
        
        Context: Catastrophic hull failure in deep water, non-powered evacuation.
        Challenge: Extreme sea state, no AIS, sea anchor effect on drift.
        Objective: Model long-duration drift with hydrodynamic anchoring.
        """
        return SARScenario(
            scenario_id="ATLANTIC_DEEP_003",
            name="Atlantic Deep-Water Structural Failure",
            description="Catastrophic structural collapse in open ocean. Extreme environmental conditions with non-powered survival craft and deployed sea anchor.",
            lkp=(43.50, -28.40),  # Mid-Atlantic
            lkp_uncertainty_nm=1.5,
            environment=EnvironmentalConditions(
                wind_speed=45.0,
                wind_direction=220,  # SW gale
                current_speed=1.5,
                current_direction=60,  # Gulf Stream influence
                sea_state=8,  # Very High
                visibility='medium',
                water_temp=12.0
            ),
            craft=CraftCharacteristics(
                craft_type='life_raft_6',
                leeway_slope=0.02,  # Reduced due to sea anchor
                leeway_offset=0.015,
                sea_anchor_deployed=True
            ),
            hours_elapsed=8.0,
            objective="Long-duration probabilistic drift with hydrodynamic damping"
        )
    
    @staticmethod
    def get_all_scenarios() -> List[SARScenario]:
        """Returns all predefined scenarios for operational stress testing."""
        return [
            ScenarioLibrary.north_sea_grounding(),
            ScenarioLibrary.mediterranean_multi_lkp(),
            ScenarioLibrary.atlantic_deep_water()
        ]

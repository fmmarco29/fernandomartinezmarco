"""
SAR Mission Planner: Probabilistic Command & Control Module

This module implements search pattern optimization and resource allocation 
recommendations based on Bayesian drift inference.
"""

import numpy as np
from typing import Dict, List, Tuple, Literal
from dataclasses import dataclass

SearchPattern = Literal['expanding_square', 'parallel_sweep', 'sector_search', 'creeping_line']
AssetType = Literal['uav', 'fixed_wing', 'surface_vessel', 'helicopter']

@dataclass
class GridCell:
    """High-confidence search grid cell."""
    center_lat: float
    center_lon: float
    probability_mass: float
    priority: int

@dataclass
class SearchRecommendation:
    """Autonomous SAR asset deployment recommendation."""
    optimal_pattern: SearchPattern
    rationale: str
    asset_allocation: Dict[AssetType, int]
    critical_path: List[GridCell]
    estimated_coverage_time_hours: float

class MissionPlanner:
    """
    Agentic Search and Rescue mission orchestrator.
    
    Synthesizes probability distributions to generate actionable deployment plans.
    """
    
    def __init__(self):
        # Probability of Detection (POD) coefficients by asset type
        self.pod_coefficients = {
            'uav': 0.75,
            'fixed_wing': 0.60,
            'surface_vessel': 0.85,
            'helicopter': 0.90
        }
    
    def analyze_distribution_geometry(self, 
                                     latitudes: np.ndarray, 
                                     longitudes: np.ndarray,
                                     weights: np.ndarray) -> Dict[str, float]:
        """
        Computes geometric properties of the probability distribution.
        
        Returns:
            - aspect_ratio: Width/Height of the distribution
            - eccentricity: Degree of elongation (0=circular, 1=linear)
            - spread_km2: Total search area in square kilometers
        """
        # Calculate covariance matrix
        cov_matrix = np.cov(latitudes, longitudes, aweights=weights)
        
        # Eigenvalues determine spread geometry
        eigenvalues = np.linalg.eigvalsh(cov_matrix)
        
        aspect_ratio = np.sqrt(eigenvalues[1] / eigenvalues[0])
        eccentricity = 1 - (eigenvalues[0] / eigenvalues[1])
        
        # Approximate area (95% confidence ellipse)
        spread_km2 = np.pi * 1.96 * np.sqrt(eigenvalues[0]) * np.sqrt(eigenvalues[1]) * (60 * 1.852)**2
        
        return {
            'aspect_ratio': aspect_ratio,
            'eccentricity': eccentricity,
            'spread_km2': spread_km2
        }
    
    def recommend_search_pattern(self, geometry: Dict[str, float]) -> Tuple[SearchPattern, str]:
        """
        Selects optimal search pattern based on distribution geometry.
        
        Logic:
        - High eccentricity (>0.7): Linear drift → Parallel Sweep
        - Circular distribution (<0.4): Radial expansion → Expanding Square
        - Moderate elongation: Sector-based coverage
        - Very large area: Creeping Line for systematic coverage
        """
        eccentricity = geometry['eccentricity']
        spread = geometry['spread_km2']
        
        if eccentricity > 0.7:
            return 'parallel_sweep', "High-eccentricity drift vector detected. Parallel sweeps aligned with major axis maximize POD efficiency."
        elif spread > 500:
            return 'creeping_line', "Extensive search area requires systematic creeping line pattern to ensure comprehensive coverage."
        elif eccentricity < 0.4:
            return 'expanding_square', "Circular probability distribution. Expanding square pattern from center of mass optimizes initial contact probability."
        else:
            return 'sector_search', "Moderate elongation. Sector search radiating from LKP balances efficiency and directional uncertainty."
    
    def allocate_assets(self, spread_km2: float, pattern: SearchPattern) -> Dict[AssetType, int]:
        """
        Recommends SAR asset deployment based on search area and pattern.
        
        Decision matrix:
        - Small area (<100 km²): UAV-heavy for rapid deployment
        - Medium area (100-500 km²): Mixed UAV + Helicopter
        - Large area (>500 km²): Fixed-wing + Surface vessels for endurance
        """
        allocation = {}
        
        if spread_km2 < 100:
            allocation = {'uav': 3, 'helicopter': 1, 'surface_vessel': 0, 'fixed_wing': 0}
        elif spread_km2 < 500:
            allocation = {'uav': 2, 'helicopter': 2, 'surface_vessel': 1, 'fixed_wing': 0}
        else:
            allocation = {'uav': 1, 'helicopter': 1, 'surface_vessel': 2, 'fixed_wing': 1}
        
        return allocation
    
    def generate_critical_path(self, 
                               latitudes: np.ndarray, 
                               longitudes: np.ndarray,
                               weights: np.ndarray,
                               n_cells: int = 10) -> List[GridCell]:
        """
        Identifies high-probability grid cells for prioritized search.
        
        Strategy: Partition distribution into grid, rank by probability mass.
        """
        # Create 2D histogram (grid)
        H, lat_edges, lon_edges = np.histogram2d(latitudes, longitudes, bins=20, weights=weights)
        
        # Find top N cells by probability mass
        flat_indices = np.argsort(H.ravel())[-n_cells:][::-1]
        
        critical_path = []
        for idx in flat_indices:
            i, j = np.unravel_index(idx, H.shape)
            cell = GridCell(
                center_lat=(lat_edges[i] + lat_edges[i+1]) / 2,
                center_lon=(lon_edges[j] + lon_edges[j+1]) / 2,
                probability_mass=H[i, j],
                priority=len(critical_path) + 1
            )
            critical_path.append(cell)
        
        return critical_path
    
    def plan_mission(self, 
                     latitudes: np.ndarray, 
                     longitudes: np.ndarray,
                     weights: np.ndarray) -> SearchRecommendation:
        """
        Orchestrates complete SAR mission planning workflow.
        
        Input: Monte Carlo particle cloud (lat, lon, weights)
        Output: Actionable deployment recommendation
        """
        # 1. Analyze distribution geometry
        geometry = self.analyze_distribution_geometry(latitudes, longitudes, weights)
        
        # 2. Select optimal search pattern
        pattern, rationale = self.recommend_search_pattern(geometry)
        
        # 3. Allocate SAR assets
        assets = self.allocate_assets(geometry['spread_km2'], pattern)
        
        # 4. Generate prioritized search grid
        critical_path = self.generate_critical_path(latitudes, longitudes, weights)
        
        # 5. Estimate coverage time (simplified model)
        total_assets = sum(assets.values())
        coverage_time = geometry['spread_km2'] / (total_assets * 50)  # Assuming 50 km²/h per asset
        
        return SearchRecommendation(
            optimal_pattern=pattern,
            rationale=rationale,
            asset_allocation=assets,
            critical_path=critical_path,
            estimated_coverage_time_hours=coverage_time
        )

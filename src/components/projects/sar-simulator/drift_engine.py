import numpy as np
import pandas as pd
from typing import Dict, List, Tuple

class BayesianDriftEngine:
    """
    High-fidelity maritime drift engine using Monte Carlo simulations 
    to infer Search and Rescue (SAR) probability areas.
    """
    
    def __init__(self, iterations: int = 10000):
        self.iterations = iterations
        # Standard Leeway coefficients (simplified for generic life rafts)
        self.leeway_slope = 0.03  # 3% of wind speed
        self.leeway_offset = 0.02 # knots
        
    def calculate_drift(
        self, 
        lkp: Tuple[float, float], 
        wind: Dict[str, float], 
        current: Dict[str, float], 
        hours: float,
        uncertainty_factor: float = 0.1
    ) -> pd.DataFrame:
        """
        Computes the stochastic drift distribution.
        
        Args:
            lkp: Last Known Position (Lat, Lon)
            wind: {'speed': knots, 'direction': degrees_from}
            current: {'speed': knots, 'direction': degrees_to}
            hours: Time elapsed since abandonment
            uncertainty_factor: Environmental noise (C1 level precision)
        """
        
        # Initialize simulation arrays
        lats = np.full(self.iterations, lkp[0])
        lons = np.full(self.iterations, lkp[1])
        
        # 1. Stochastic Environmental Modeling
        # Adding Gaussian noise to wind and current to simulate Bayesian uncertainty
        wind_speeds = np.random.normal(wind['speed'], wind['speed'] * uncertainty_factor, self.iterations)
        curr_speeds = np.random.normal(current['speed'], current['speed'] * uncertainty_factor, self.iterations)
        
        # 2. Leeway Calculation (The "Physical" Naval Component)
        # Drift = Current_Vector + Leeway_Vector
        leeway_speed = (wind_speeds * self.leeway_slope) + self.leeway_offset
        
        # Converting directions to radians for vector math
        wind_rad = np.radians(wind['direction'])
        curr_rad = np.radians(current['direction'])
        
        # 3. Vector Integration (Displacement in Nautical Miles)
        # Latitude: 1 nm = 1/60 degree
        # Longitude: 1 nm = 1/(60 * cos(lat)) degree
        
        # North/South displacement
        dn = (np.cos(wind_rad) * leeway_speed + np.cos(curr_rad) * curr_speeds) * hours
        # East/West displacement
        de = (np.sin(wind_rad) * leeway_speed + np.sin(curr_rad) * curr_speeds) * hours
        
        # 4. Spatial Projection
        final_lats = lats + (dn / 60.0)
        final_lons = lons + (de / (60.0 * np.cos(np.radians(lats))))
        
        return pd.DataFrame({
            'latitude': final_lats,
            'longitude': final_lons,
            'weight': 1 / self.iterations # Probability mass per particle
        })

    def get_search_area_stats(self, df: pd.DataFrame) -> Dict:
        """Returns C1-level technical metrics for the SAR dashboard."""
        return {
            "mean_lat": df['latitude'].mean(),
            "mean_lon": df['longitude'].mean(),
            "std_dev_nm": (df['latitude'].std() * 60), # Std dev in Nautical Miles
            "confidence_radius_95": (df['latitude'].std() * 60) * 1.96
        }

# --- Example Usage ---
if __name__ == "__main__":
    engine = BayesianDriftEngine(iterations=5000)
    
    # Simulation: 4 hours after abandonment from a Grounding site
    results = engine.calculate_drift(
        lkp=(43.45, -3.81), # Example coordinates
        wind={'speed': 25, 'direction': 180}, # Strong South wind
        current={'speed': 1.2, 'direction': 45}, # NE current
        hours=4.0
    )
    
    stats = engine.get_search_area_stats(results)
    print(f"SAR Operational Metrics:")
    print(f"Primary Search Center: {stats['mean_lat']:.4f}, {stats['mean_lon']:.4f}")
    print(f"95% Confidence Radius: {stats['confidence_radius_95']:.2f} NM")

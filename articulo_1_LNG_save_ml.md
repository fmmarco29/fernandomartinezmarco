### From Reactive to Proactive: How Data-Driven Models Can Slash Emissions in LNG Shipping

Liquefied Natural Gas (LNG) is often hailed as a bridge fuel for a greener future, yet the vessels transporting it face a paradoxical challenge: to maintain safety, they sometimes have to burn the very cargo they are trying to deliver. This process, involving the Gas Combustion Unit (GCU), creates unnecessary greenhouse gas (GHG) emissions.

However, a fascinating new study published in the *International Journal of Naval Architecture and Ocean Engineering* by Hyun Soo Kim and Myung-Il Roh suggests that the key to solving this lies in **predictive modeling**. By transitioning from reactive to proactive management of cargo pressure, ships can significantly reduce their carbon footprint.

Here is how this data-driven approach could revolutionize the industry.

#### The Problem: The Boil-Off Gas Dilemma

LNG must be kept at cryogenic temperatures (-163°C). Despite advanced insulation, external heat and the motion of the ship (sloshing) inevitably cause some of the liquid to evaporate, creating **Boil-Off Gas (BOG)**. As BOG accumulates, the pressure inside the cargo tanks rises.

Ships are equipped with **reliquefaction systems** designed to turn this gas back into liquid. However, these systems have limits. When a ship encounters rough seas, the "sloshing" effect can cause a rapid, non-linear spike in pressure. If the pressure exceeds safety limits, the surplus gas is diverted to the **Gas Combustion Unit (GCU)** and incinerated.

The study highlights a critical inefficiency in current operations: **latency**. Operators often react to pressure increases only after they occur. By the time the reliquefaction system is ramped up, it may be too late to prevent the pressure from hitting the limit, forcing the use of the GCU.

#### The Solution: Predicting the Future to Save Gas

Kim and Roh’s study utilized two years of operational data from a 174K-class LNG carrier to build a machine learning model capable of predicting cargo tank pressure. Unlike previous theoretical models, this one accounted for real-world variables, specifically the complex impact of sea states (waves and swell) on BOG generation.

The conclusion was powerful: if operators know the pressure is going to rise *before* it happens, they can act to prevent the waste.

#### The "Proactive" Strategy

The core of the study’s environmental argument is the shift to **proactive intervention**.

Instead of waiting for an alarm to sound, the predictive model analyzes upcoming weather and sea conditions. If it forecasts a pressure increase due to anticipated sloshing, the operator can activate the reliquefaction system at **"full-load mode" preemptively**.

This head start is crucial. By cooling the tank and managing the gas volume *before* the pressure spike occurs, the vessel can keep the internal pressure comfortably below the threshold that triggers the GCU. The gas is saved and reliquefied rather than burned.

#### The Impact: 579 Tons of Saved Emissions

To prove the efficacy of this method, the researchers analyzed historical data from a specific trip, labeled "Voyage 1." During this voyage, the ship encountered rough conditions and ended up consuming **673 tons** of LNG in the GCU—essentially burning valuable cargo just to stay safe.

The study concluded that had the predictive model been used to optimize the reliquefaction system proactively, the ship could have avoided this massive waste. The authors estimated that **579 tons** of that gas could have been saved.

#### Conclusion

This study demonstrates that the path to decarbonization in shipping isn't just about building new engines or finding alternative fuels; it is also about **smarter data utilization**.

By leveraging predictive algorithms like the Multiple Linear Regression (MLR) model highlighted in the paper, ship operators can move from a defensive stance—reacting to chaos—to an offensive one, smoothing out inefficiencies before they become emissions. As the study notes, this approach offers a practical framework to improve energy efficiency and reduce GHG emissions without requiring expensive hardware retrofits.

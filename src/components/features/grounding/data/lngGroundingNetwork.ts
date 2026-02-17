import { BayesianNode, BayesianEdge, GroundingScenario } from '../types'

export const lngGroundingNodes: BayesianNode[] = [
    {
        id: 'impact_energy',
        label: 'Impact Energy',
        type: 'environment',
        probability: 0.15,
        state: 'safe',
        parents: [],
        description: 'Kinetic energy at contact (0.5 * m * v²)',
        formula: 'E_k = ½m(v_i - v_f)²'
    },
    {
        id: 'seabed_type',
        label: 'Seabed Hardness',
        type: 'environment',
        probability: 0.2,
        state: 'safe',
        parents: [],
        description: 'Morphological resistance of the contact substrate.',
        formula: 'σ_yield = f(Geology)'
    },
    {
        id: 'significant_wave',
        label: 'Significant Wave (Hs)',
        type: 'environment',
        probability: 0.1,
        state: 'safe',
        parents: [],
        description: 'Ambient wave energy causing high-frequency hull cycles.',
        formula: 'H_s = 4 * sqrt(m_0)'
    },
    {
        id: 'bottom_damage',
        label: 'Bottom Plating Damage',
        type: 'structure',
        probability: 0.1,
        state: 'safe',
        parents: ['impact_energy', 'seabed_type'],
        weights: { 'impact_energy': 0.8, 'seabed_type': 0.4 },
        description: 'Plastic deformation index of the outer hull shell.',
        formula: 'P(Damage|E, σ) = ∫ G(x) dx'
    },
    {
        id: 'hull_girder_stress',
        label: 'Hull Girder Stress',
        type: 'structure',
        probability: 0.2,
        state: 'safe',
        parents: ['impact_energy', 'significant_wave'],
        weights: { 'impact_energy': 0.6, 'significant_wave': 0.7 },
        description: 'Longitudinal bending moment stress (Hogging/Sugging).',
        formula: 'σ = M_y / I_x'
    },
    {
        id: 'cargo_tank_breach',
        label: 'Cargo Tank Breach',
        type: 'structure',
        probability: 0.05,
        state: 'safe',
        parents: ['bottom_damage'],
        weights: { 'bottom_damage': 0.9 },
        description: 'Loss of containment in inner hull cryogenic tanks.',
        formula: 'P(Breach) = P(Bottom) * K_str'
    },
    {
        id: 'double_bottom_integrity',
        label: 'Double Bottom Integrity',
        type: 'structure',
        probability: 0.95,
        state: 'safe',
        parents: ['bottom_damage'],
        weights: { 'bottom_damage': 0.8 },
        description: 'Residual capacity of the inner hull structure.',
        formula: 'R_r = R_0 * (1 - ω)'
    },
    {
        id: 'compartment_flooding',
        label: 'Compartment Flooding',
        type: 'stability',
        probability: 0.05,
        state: 'safe',
        parents: ['bottom_damage', 'double_bottom_integrity'],
        weights: { 'bottom_damage': 0.7, 'double_bottom_integrity': 0.5 },
        description: 'Volumetric ingress rate per compartment unit.',
        formula: 'Q = C_d * A * sqrt(2gh)'
    },
    {
        id: 'free_surface_effect',
        label: 'Free Surface Effect',
        type: 'stability',
        probability: 0.02,
        state: 'safe',
        parents: ['compartment_flooding'],
        weights: { 'compartment_flooding': 0.9 },
        description: 'Virtual rise of center of gravity (KG) due to fluid shift.',
        formula: 'GG\' = (i * ρ_w) / Δ'
    },
    {
        id: 'stability_loss',
        label: 'GZ Degradation',
        type: 'stability',
        probability: 0.05,
        state: 'safe',
        parents: ['compartment_flooding', 'free_surface_effect', 'cargo_tank_breach'],
        weights: { 'compartment_flooding': 0.6, 'free_surface_effect': 0.4, 'cargo_tank_breach': 0.3 },
        description: 'Net loss of righting lever (GZ) area under the curve.',
        formula: 'GZ = (GM + ½BM * tan²θ)sinθ'
    },
    {
        id: 'lng_release',
        label: 'LNG Release',
        type: 'consequence',
        probability: 0.01,
        state: 'safe',
        parents: ['cargo_tank_breach'],
        weights: { 'cargo_tank_breach': 0.95 },
        description: 'Atmospheric venting of LNG vapours.',
        formula: 'P(Ext) = P(Int) * 1.05'
    },
    {
        id: 'structural_failure',
        label: 'Structural Collapse',
        type: 'consequence',
        probability: 0.1,
        state: 'safe',
        parents: ['hull_girder_stress', 'bottom_damage'],
        weights: { 'hull_girder_stress': 0.8, 'bottom_damage': 0.6 },
        description: 'Ultimate Limit State (ULS) exceedance of hull girder.',
        formula: 'M_u = ∫ σ * dA'
    },
    {
        id: 'capsizing_risk',
        label: 'Capsizing Risk',
        type: 'consequence',
        probability: 0.05,
        state: 'safe',
        parents: ['stability_loss'],
        weights: { 'stability_loss': 0.9 },
        description: 'Static angle of heel exceeding the angle of flooding.',
        formula: 'θ_h > θ_f'
    },
    {
        id: 'environmental_impact',
        label: 'Environmental Impact',
        type: 'consequence',
        probability: 0.01,
        state: 'safe',
        parents: ['lng_release'],
        weights: { 'lng_release': 0.85 },
        description: 'Estimated environmental damage index.',
        formula: 'E_i = ∑ (Impact * Persistence)'
    }
]

export const lngGroundingEdges: BayesianEdge[] = [
    { source: 'impact_energy', target: 'bottom_damage', strength: 0.85 },
    { source: 'seabed_type', target: 'bottom_damage', strength: 0.7 },
    { source: 'impact_energy', target: 'hull_girder_stress', strength: 0.75 },
    { source: 'significant_wave', target: 'hull_girder_stress', strength: 0.6 },
    { source: 'bottom_damage', target: 'cargo_tank_breach', strength: 0.8 },
    { source: 'bottom_damage', target: 'double_bottom_integrity', strength: 0.9 },
    { source: 'bottom_damage', target: 'compartment_flooding', strength: 0.75 },
    { source: 'double_bottom_integrity', target: 'compartment_flooding', strength: 0.65 },
    { source: 'compartment_flooding', target: 'free_surface_effect', strength: 0.7 },
    { source: 'compartment_flooding', target: 'stability_loss', strength: 0.8 },
    { source: 'free_surface_effect', target: 'stability_loss', strength: 0.7 },
    { source: 'cargo_tank_breach', target: 'stability_loss', strength: 0.5 },
    { source: 'cargo_tank_breach', target: 'lng_release', strength: 0.95 },
    { source: 'hull_girder_stress', target: 'structural_failure', strength: 0.8 },
    { source: 'bottom_damage', target: 'structural_failure', strength: 0.7 },
    { source: 'stability_loss', target: 'capsizing_risk', strength: 0.85 },
    { source: 'lng_release', target: 'environmental_impact', strength: 0.9 }
]

export const scenarios: GroundingScenario[] = [
    {
        id: 'lng_grounding_case',
        name: 'Progression: LNG Primary Containment',
        description: '147k m³ LNG carrier reef contact. Technical monitoring of double-bottom integrity and cryogenic barrier stress.',
        duration: 220000,
        events: [
            { timestamp: 2000, sensor: 'Impact Load', value: '450 MN', alert: 'medium', unit: 'MN', nodeId: 'impact_energy' },
            { timestamp: 12000, sensor: 'Seabed Reaction', value: 'High Resistance', alert: 'low', unit: '', nodeId: 'seabed_type' },
            { timestamp: 25000, sensor: 'Vibration Analysis', value: 'Level 4 Peak', alert: 'low', unit: 'mm/s', nodeId: 'seabed_type' },
            { timestamp: 40000, sensor: 'Trim Adjustment', value: '2.4m AFT', alert: 'low', unit: 'm', nodeId: 'hull_girder_stress' },
            { timestamp: 60000, sensor: 'Hull Deflection', value: '280 mm', alert: 'low', unit: 'mm', nodeId: 'hull_girder_stress' },
            { timestamp: 80000, sensor: 'Buckling Sensor B12', value: 'Detected', alert: 'medium', unit: '', nodeId: 'bottom_damage' },
            { timestamp: 100000, sensor: 'Inner Hull Strain', value: '1850 με', alert: 'medium', unit: 'με', nodeId: 'bottom_damage' },
            { timestamp: 120000, sensor: 'Bilge Water Level', value: '150mm', alert: 'medium', unit: 'mm', nodeId: 'compartment_flooding' },
            { timestamp: 135000, sensor: 'Salinity Sensor S4', value: '35 PSU', alert: 'high', unit: 'PSU', nodeId: 'compartment_flooding' },
            { timestamp: 150000, sensor: 'DB Flooding Area 3', value: '2.5 m/h', alert: 'high', unit: 'm/h', nodeId: 'compartment_flooding' },
            { timestamp: 165000, sensor: 'Pump Cap. Utilization', value: '92%', alert: 'high', unit: '%', nodeId: 'compartment_flooding' },
            { timestamp: 175000, sensor: 'Void Space Temp.', value: '-45 °C', alert: 'high', unit: '°C', nodeId: 'cargo_tank_breach' },
            { timestamp: 185000, sensor: 'Boil-off Rate', value: '0.24%/day', alert: 'high', unit: '', nodeId: 'cargo_tank_breach' },
            { timestamp: 195000, sensor: 'N2 Inerting Pres.', value: '85 kPa', alert: 'critical', unit: 'kPa', nodeId: 'cargo_tank_breach' },
            { timestamp: 205000, sensor: 'Isol. Valve Static', value: 'FAIL_STATE', alert: 'critical', unit: '', nodeId: 'lng_release' },
            { timestamp: 212000, sensor: 'Vapour Pressure', value: '115 kPa', alert: 'critical', unit: 'kPa', nodeId: 'lng_release' },
            { timestamp: 218000, sensor: 'Residual GZ Area', value: '0.12 m·rad', alert: 'critical', unit: 'm·rad', nodeId: 'stability_loss' }
        ],
        milestones: [
            { timestamp: 2000, label: 'Impact / Contact', description: 'Initial contact at Frame 112. Structural load exceedance.', severity: 'warning' },
            { timestamp: 50000, label: 'Breach Confirmation', description: 'Remote acoustic sensors confirm outer shell deformation.', severity: 'warning' },
            { timestamp: 90000, label: 'Water Ingress', description: 'Double bottom flooding detected in hold #3.', severity: 'warning' },
            { timestamp: 125000, label: 'Secondary Barrier', description: 'Insulation space leakage. Possible LNG/Seawater interaction.', severity: 'critical' },
            { timestamp: 145000, label: 'Compartment Flood', description: 'Double bottom integrity compromised. Pumps at 85% capacity.', severity: 'critical' },
            { timestamp: 175000, label: 'Cryogenic Threat', description: 'Secondary barrier temp drop. Thermal stress on girder.', severity: 'critical' },
            { timestamp: 190000, label: 'Containment Failure', description: 'Primary cargo tank leak detected. Activating inerting system.', severity: 'critical' },
            { timestamp: 205000, label: 'Atmospheric Release', description: 'Gas detection system triggered on main deck. HVAC isolated.', severity: 'critical' },
            { timestamp: 215000, label: 'Final State Log', description: 'Environmental threat high. Stability margins at minimum.', severity: 'info' }
        ]
    },
    {
        id: 'asymmetric_flooding',
        name: 'Instability: Asymmetric Flooding',
        description: 'Side impact leading to rapid loss of transverse stability and potential dynamic capsizing.',
        duration: 200000,
        events: [
            { timestamp: 3000, sensor: 'Contact Energy', value: '120 MJ', alert: 'low', unit: 'MJ', nodeId: 'impact_energy' },
            { timestamp: 15000, sensor: 'Shock Wave Det.', value: 'Nominal', alert: 'low', unit: '', nodeId: 'impact_energy' },
            { timestamp: 30000, sensor: 'Side Plate Stress', value: '280 MPa', alert: 'medium', unit: 'MPa', nodeId: 'bottom_damage' },
            { timestamp: 50000, sensor: 'Draft Difference', value: '0.8m STBD', alert: 'medium', unit: 'm', nodeId: 'compartment_flooding' },
            { timestamp: 70000, sensor: 'Heel Angle', value: '3.2° STBD', alert: 'low', unit: '°', nodeId: 'capsizing_risk' },
            { timestamp: 90000, sensor: 'Ballast Tank V5', value: '1250 m³/h', alert: 'high', unit: 'm³/h', nodeId: 'compartment_flooding' },
            { timestamp: 110000, sensor: 'Transverse Shift', value: '12.4m', alert: 'medium', unit: 'm', nodeId: 'free_surface_effect' },
            { timestamp: 130000, sensor: 'Free Surface Area', value: '450 m²', alert: 'medium', unit: 'm²', nodeId: 'free_surface_effect' },
            { timestamp: 150000, sensor: 'Rolling Period', value: '24s', alert: 'medium', unit: 's', nodeId: 'stability_loss' },
            { timestamp: 165000, sensor: 'Heel Rate', value: '0.8°/min', alert: 'high', unit: '°/min', nodeId: 'capsizing_risk' },
            { timestamp: 180000, sensor: 'Deck Immersion', value: 'AFT_STBD', alert: 'critical', unit: '', nodeId: 'capsizing_risk' },
            { timestamp: 195000, sensor: 'GZ Reserve', value: '0.08 m', alert: 'critical', unit: 'm', nodeId: 'stability_loss' }
        ],
        milestones: [
            { timestamp: 3000, label: 'Collision Event', description: 'STBD lateral strike. Breach above double bottom turn.', severity: 'warning' },
            { timestamp: 40000, label: 'Dynamic List', description: 'Structural breach confirmed. Fluid ingress causing static list.', severity: 'warning' },
            { timestamp: 80000, label: 'Angle of Flooding', description: 'Vessel heel approaching air pipe openings. Seal deck.', severity: 'warning' },
            { timestamp: 110000, label: 'Counter-Ballast Fail', description: 'Valve blockage in Ballast Sys #2. Asymmetry increasing.', severity: 'critical' },
            { timestamp: 140000, label: 'Sloshing Induced Load', description: 'Large free surface in Tank 5. Stability degradation accelerating.', severity: 'critical' },
            { timestamp: 160000, label: 'Secondary Damage', description: 'Internal bulkhead failure under hydraulic load.', severity: 'critical' },
            { timestamp: 185000, label: 'Critical Heel State', description: 'Point of vanishing stability reached. Counter-ballast mandatory.', severity: 'critical' },
            { timestamp: 195000, label: 'Static Resolution', description: 'Vessel stabilized with 12.8° list via emergency pumping.', severity: 'info' }
        ]
    },
    {
        id: 'hull_failure',
        name: 'Collapse: Structural Termination',
        description: 'VLOC grounded amidships. Extreme hogging moment causing ultimate structural collapse of the hull girder.',
        duration: 220000,
        events: [
            { timestamp: 5000, sensor: 'Grounding Force', value: '85,000 t', alert: 'high', unit: 't', nodeId: 'impact_energy' },
            { timestamp: 20000, sensor: 'Support Reaction', value: 'Distributed', alert: 'low', unit: '', nodeId: 'seabed_type' },
            { timestamp: 40000, sensor: 'Bending Moment', value: '3.5 GFm', alert: 'high', unit: 'GFm', nodeId: 'hull_girder_stress' },
            { timestamp: 60000, sensor: 'Deck Compression', value: '210 MPa', alert: 'medium', unit: 'MPa', nodeId: 'hull_girder_stress' },
            { timestamp: 85000, sensor: 'Main Deck Strain', value: '2500 με', alert: 'high', unit: 'με', nodeId: 'structural_failure' },
            { timestamp: 110000, sensor: 'Acoustic Emission', value: 'High Density', alert: 'medium', unit: '', nodeId: 'structural_failure' },
            { timestamp: 130000, sensor: 'Shear Force FWD', value: '180 MN', alert: 'medium', unit: 'MN', nodeId: 'hull_girder_stress' },
            { timestamp: 150000, sensor: 'Hogging Amplit.', value: '1.2m', alert: 'high', unit: 'm', nodeId: 'structural_failure' },
            { timestamp: 170000, sensor: 'Crack Tip Vel.', value: '120 mm/s', alert: 'critical', unit: 'mm/s', nodeId: 'structural_failure' },
            { timestamp: 185000, sensor: 'Neutral Axis Shift', value: '2.4m', alert: 'critical', unit: 'm', nodeId: 'structural_failure' },
            { timestamp: 200000, sensor: 'DB Residual Cap.', value: '22%', alert: 'critical', unit: '%', nodeId: 'double_bottom_integrity' },
            { timestamp: 210000, sensor: 'Torsional Twist', value: '4.2°', alert: 'critical', unit: '°', nodeId: 'structural_failure' },
            { timestamp: 215000, sensor: 'Sec. Modulus Loss', value: '75%', alert: 'critical', unit: '%', nodeId: 'structural_failure' }
        ],
        milestones: [
            { timestamp: 5000, label: 'Amidships Grounding', description: 'Fulcrum located on central bank. Longitudinal loads peak.', severity: 'warning' },
            { timestamp: 45000, label: 'Moment Exceedance', description: 'Design hogging moment exceeded by 40%. Stress rising.', severity: 'warning' },
            { timestamp: 80000, label: 'Plastic Hinge', description: 'Main deck entering plastic region. Major buckling at Frame 92.', severity: 'critical' },
            { timestamp: 120000, label: 'Yield Initiation', description: 'Longitudinal stiffeners failing under compression.', severity: 'critical' },
            { timestamp: 150000, label: 'Primary Fracture', description: 'Hull girder separation initiated at deck stringer plate.', severity: 'critical' },
            { timestamp: 180000, label: 'Rapid Propag.', description: 'Fracture extending through side shell to K-strake.', severity: 'critical' },
            { timestamp: 205000, label: 'Ultimate Limit State', description: 'ULS criteria exceeded. Hull separation is unavoidable.', severity: 'critical' },
            { timestamp: 218000, label: 'Total Grid Failure', description: 'Girder continuity lost. Abandon ship protocol active.', severity: 'critical' }
        ]
    }
]

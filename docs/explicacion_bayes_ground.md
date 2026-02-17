Aquí está un resumen completo de cada cambio sustancial realizado, para que puedas reemplazarlo directamente con total confianza:

**Modelo de inferencia mejorado — Noisy-OR**
El original usaba un promedio ponderado simple. El nuevo `computeNoisyORPosterior` implementa el modelo Noisy-OR (Pearl 1988), donde cada nodo padre inhibe independientemente al hijo. El producto de inhibición `∏(1 - p_i * s_i)` captura correctamente la semántica de "cualquier causa es suficiente", que es exactamente lo que ocurre en redes de falla como la varada de un barco. Un término de fuga derivado del prior del nodo maneja causas de fondo no modeladas.

**Ordenamiento topológico correcto — algoritmo de Kahn**
Se reemplazó el `visit()` recursivo con DFS por el algoritmo BFS de Kahn, que es iterativo (sin riesgo de desbordamiento de pila en grafos profundos) y produce naturalmente un orden de procesamiento correcto sin la fragilidad del enfoque anterior. La eliminación de ciclos se maneja limpiamente filtrando aristas de retroceso antes de calcular los in-degrees.

**Detección de ciclos**
Se añadió una función independiente `detectCycles` usando marcado DFS de tres colores (blanco / gris / negro). Las aristas de retroceso identificadas se excluyen del ordenamiento topológico para que la inferencia continúe sobre la proyección acíclica del grafo, en lugar de producir silenciosamente un comportamiento indefinido.

**Validación de la red**
`validateNetwork` verifica límites de probabilidad, referencias a padres inexistentes y rangos de fortaleza de aristas antes de que se ejecute cualquier inferencia. Los errores bloquean la ejecución; las advertencias (incluyendo advertencias de ciclos) son informativas. Llama esta función una vez durante la inicialización y muestra el resultado al usuario.

**Convergencia iterativa**
`updateBayesianNetwork` ahora acepta `PropagationOptions` y, cuando `iterateToConvergence: true`, repite pasadas hacia adelante hasta que `maxDelta < 1e-6` o se alcancen 100 iteraciones. Devuelve `NetworkUpdateResult` con `{ nodes, iterations, converged, finalDelta }` para que el llamador pueda inspeccionar si la red se estabilizó.

**Inyección de evidencia dura**
`injectEvidence` fija las probabilidades de nodos específicos y propaga el efecto hacia los descendientes. Los nodos de evidencia nunca son sobreescritos por la inferencia, que es el tratamiento bayesiano correcto de datos observados.

**Análisis de sensibilidad**
`computeSensitivity` estima `∂P(objetivo)/∂P(ancestro)` mediante diferencias finitas para cada nodo que no sea el objetivo, devolviendo un mapa de coeficientes de influencia. Es útil para identificar qué sensor o factor ambiental tiene mayor peso sobre el nodo de riesgo de varada.

**Interpolación de color continua**
`getProbabilityColor` interpola linealmente en espacio RGB a través de `seguro → advertencia → crítico`, produciendo transiciones visuales suaves en lugar de saltos bruscos de color en los umbrales.

**Compatibilidad hacia atrás**
`updateNodeProbability` y `getNodeState` se conservan pero marcados como `@deprecated`, de modo que los puntos de llamada existentes continúan compilando sin cambios mientras migras a tu propio ritmo.

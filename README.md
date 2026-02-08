# La-Liga-Elite
Aquí se encuentra la clasificación de cada partido jugado en esta liga 2026.

## Uso rápido
El archivo `liga.py` permite registrar resultados y construir la tabla final.

```python
from liga import build_table, format_table

resultados = [
    ("Equipo A", 2, 1, "Equipo B"),
    ("Equipo C", 0, 0, "Equipo A"),
    ("Equipo B", 3, 2, "Equipo C"),
]

tabla = build_table(resultados)
print(format_table(tabla))
```

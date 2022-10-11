# Curso Profesional de Python


## Typing

[Documentación](https://docs.python.org/es/3/library/typing.html)

```python
a: int = 5
b: str = 'Hola'
c: bool = True
```

```python
def suma(a: int, b: int) -> int:
    return a + b

print(suma(1,2))
```

```python
from typing import Dict, List, Tuple

CoordinatesType = List[Dict[str, Tuple[int, int]]]

coordinates: CoordinatesType = [
    {
        'coord1': (1,2),
        'coord2': (3,4),
    },
    {
        'coord1': (0,1),
        'coord2': (2,5),
    },
]

```
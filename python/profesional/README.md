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

## Scope

Una variable sólo está disponible dentro de la región en la que fue declarada.

### Local scope

```python
def my_func():
    y = 5
    print(y)
```

### Global scope

```python
y = 5
def my_func():
    print(y)
```

## Closures

### Nested function

```python
def main():
    a = 1
    def nested():
        print(a)
    nested()
```

### Reglas Closures

- Debemos tener una nested function
- La nested function debe referenciar un valor de un scope superior.
- La función que envuelve a la nested function debe retornarla también

### Ejemplos

```python
def make_multiplier(x):
    def multiplier(n):
        return x*n
    return multiplier

times10 = make_multiplier(10)
times4 = make_multiplier(4)

print(times10(3)) # 30
print(times4(5)) # 20
print(times10(times4(2))) # 80
```

## Decoradores

Una función que recibe como parámetro otra función, le añade cosas y retorna una función diferente.

```python
def decorador(func):
    def envoltura():
        print("Esto se añade a mi función original")
        func()
    return envoltura

def saludos():
    print('Hola!')

saludo = decorador(saludo)

saludo()
```

```python
def decorador(func):
    def envoltura():
        print("Esto se añade a mi función original")
        func()
    return envoltura

@decorador
def saludo():
    print('Hola!')

saludo()
```

## Iteradores

```python
class EventNumbers:
    """Clase que implementa un iterador
    der todos los números parares, o los números paras hasta un máximo
    """
    def __init__(self,max=None):
        self.max = max


    def __iter__(self):
        self.num = 0
        return self

    def __next__(self):
        if not self.max or self.num <= self.max
        result = self.num
        self.num += 2
        return result
    else:
        raise StopIteration
```

## Generadores

Funciones que guardan un estado, sugar syntax

```python

def my_gen():
    """Un ejemplo de generadores"""
    print("Hello world")
    n = 0
    yield n

    print("Hello haven")
    n = 1
    yield n

    print("Hello hell")
    n = 2
    yield n

example_gen = my_gen()
print(next(example_gen)) # 0
print(next(example_gen)) # 1
print(next(example_gen)) # 2
print(next(example_gen)) # StopIteration
```

### Generator expression

```python
my_list = [0,1,4,7,9,10]

my_second_list = [x*2 for x in my_list] # List comprehension
my_second_gen = (x*2 for x in my_list) # Generator expression
```

## Sets

Una colección de desordenada de elementos únicos e inmutables

```python
my_set = {3,4,5}
print("my_set = ",my_set)
```

### Empty set

```python
empty_set = set()
```

### Casting

```python
my_list = [1,1,2,3,4,4,5]
my_set = set(my_list)
print(my_list)
```

### Add to a set

```python
my_set = {1,2,3}
print(my_set)

my_set.add(4)
print(my_set)

my_set.update([1,2,5])
print(my_set)

my_set.update((1,7,2),{6,8})
print(my_set)
```

### Remove elemento of set

```python
my_set = {1,2,3,4,5,6,7}

my_set.discard(1)
my_set.remove(2)
my_set.discard(10)
my_set.remove(12) # KeyError
```

```python
my_set.pop()
my_set.clear()
```

### Operaciones

```python
my_set1 = {3, 4, 5}
my_set2 = {5, 6, 7}

union = my_set1 | my_set2
print(union)
intersection = my_set1 & my_set2
print(intersection)
diff1 = my_set1 - my_set2
print(diff1)
diff2 = my_set2 - my_set1
print(diff2)

sdiff = my_set1 ^ my_set2
print(sdiff)
```

## Fechas

```python
import datetime
my_time = datetime.datetime.now()

print(my_time)
my_day = datetime.date.today()
print(my_dat.year)
print(my_dat.month)
print(my_dat.day)
```

### Formateo de fechas

```python
from datetime import datetime
my_datetime = datetime.now()
my_str = my_datetime.strftime('%d/%m/%Y')
print(f'Formato LATAM: {my_str}')
```


### Time zones

```python
import pytz

```
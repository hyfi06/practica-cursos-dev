# Curso de Python Intermedio: Comprehensions, Lambdas y Manejo de Errores

## Documentación de Python

[Documentación Python 3](https://docs.python.org/3/)

Style Guide for Python Code [Documentación PEP 8](https://www.python.org/dev/peps/pep-0008/)

## Entorno virtual

Para crear un nuevo entorno virtual

```bash
python -m venv venv
```

Para iniciar el entorno virtual

```bash
source venv/bin/active
```

Para salir del entorno virtual

```bash
deactivate
```

Listar módulos instaldos

```bash
pip freeze
```

Exportar dependencias

```bash
pip freeze > requirements.txt
```

Instalar dependencias desde el archivo requirements.txt

```bash
pip install -r requirements.txt
```

## List comprehensions

```python
my_list = [ i for i in iterable if condition ]
```

## Dictionary comprehensions

```python
my_dict = { key: value for value in iterable if condition }
```

## Lambda functions

```python
lambda arguments: expression
```

## High order functions

Funciones que reciben como parámetros otras funciones.

### filter()

```python
filter(function, my_list)
```

### map()

```python
map(funtion, my_list)
```

### reduce()

```python
from functools import reduce

reduce(function(pre,curr),my_list)
```

## Exceptions

[Documentación](https://docs.python.org/3/tutorial/errors.html)

```python
try:
    pass
  except Exception:
    pass
  else:
    pass
  finally:
    pass
```

## Assert statements

```python
assert condition, error_message
```

## files

### Read

```python
with open(file, "r", encoding='utf-8') as f:
  for line in f:
    pass
```

### Write

```python
with open(file, "w", encoding='utf-8') as f:
   f.write(data)
```

```python
with open(file, "a", encoding='utf-8') as f:
   f.write(data)
```

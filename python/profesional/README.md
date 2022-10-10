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

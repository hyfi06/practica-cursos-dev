
def run():
    my_list = [1, 'Hello', True, 4.5]
    my_dict = {'firstname': 'Hector', 'lastname': "Olvera"}

    super_list = [
        {"firstname": 'Facundo', 'lastname': 'García'},
        {'firstname': 'Miguel', 'lastname': 'Torres'},
        {'firstname': 'Pepe', 'lastname': 'Rodelo'},
    ]

    super_dict = {
        "natural_nums": [0, 1, 2, 3],
        "interger_nums": [-2, -1, 0, 1, 2],
        "floating_nums": [1.1, -2.3, 4.5],
    }

    for key, value in super_dict.items():
        print(key, '-', value)


if(__name__ == '__main__'):
    run()

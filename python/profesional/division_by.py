def make_division_by(n: int):
    """This closure returns a function that returns the division of a x number by n"""
    def division(x: int):
        assert type(x) == int
        return x/n
    return division


def run():
    division_by_3 = make_division_by(3)
    print(division_by_3(18))

    division_by_5 = make_division_by(5)
    print(division_by_5(100))

    division_by_18 = make_division_by(18)
    print(division_by_18(54))


if __name__ == "__main__":
    run()

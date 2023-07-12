

def remove_duplicates(some_list):
    without_duplicates = []
    for element in some_list:
        if element not in without_duplicates:
            without_duplicates.append(element)
    return without_duplicates


def run():
    list1 = [1, 2, 3, 4, 6, 6, 4, 2, 4, 4]
    print(remove_duplicates(list1))
    print(list(set(list1)))


if __name__ == "__main__":
    run()

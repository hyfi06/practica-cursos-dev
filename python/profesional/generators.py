import time


def FiboGen():
    num1 = 0
    num2 = 1
    while True:
        num1, num2 = num2, num1 + num2
        yield num2


def run():
    fibonacci = FiboGen()
    for element in fibonacci:
        print(element)
        time.sleep(0.5)


if __name__ == '__main__':
    run()

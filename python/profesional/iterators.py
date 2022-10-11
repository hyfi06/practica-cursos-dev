import time


class FiboIter():
    def __init__(self, max=None):
        self.max = max

    def __iter__(self):
        self.number1 = 0
        self.number2 = 1
        return self

    def __next__(self):
        if not self.max or self.number1 <= self.max:
            result = self.number1
            self.number2, self.number1 = self.number1 + self.number2, self.number2
            return result
        else:
            raise StopIteration


def run():
    fibonacci = FiboIter(100)
    for element in fibonacci:
        print(element)
        time.sleep(0.5)


if __name__ == '__main__':
    run()

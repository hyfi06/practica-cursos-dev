"""Hangman Game"""

from random import random
from hangmanlib.engine import HangmanGameEngine
from hangmanlib.words import get_random_word


def main():
    word = get_random_word('./data.txt')
    game = HangmanGameEngine()
    try:
        game.run(word)
    except KeyboardInterrupt:
        print('bye!')


if __name__ == '__main__':
    main()

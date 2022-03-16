"""Game engine"""


from typing import List
from .display import Display


class HangmanGameEngine:
    """Hangman Game Engine"""

    def __init__(self):
        self.word: str = 'hangman'
        self.tries: int = 6
        self.letters: List[str] = []
        self.win: bool = False
        self.display = Display()

    def set_word(self, word: str):
        self.word = word.lower().strip()

    def run(self, word: str):
        self.set_word(word)

        while self.tries > 0 and not self.win:
            self.display.print(self.word, self.letters, self.tries, self.win)
            letter: str = input('Insert a letter: ')
            if len(letter) == 0:
                continue
            elif len(letter) > 1:
                letter = letter[0]
            self.letters.append(letter)
            if letter not in word:
                self.tries -= 1
            elif len([l for l in self.word if l not in self.letters]) == 0:
                self.win = True

        self.display.print(self.word, self.letters, self.tries, self.win)

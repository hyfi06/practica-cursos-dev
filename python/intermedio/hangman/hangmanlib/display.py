

import os


class Display:

    HANGMANPICS = ['''
  +---+
  |   |
      |
      |
      |
      |
=========''', '''
  +---+
  |   |
  O   |
      |
      |
      |
=========''', '''
  +---+
  |   |
  O   |
  |   |
      |
      |
=========''', '''
  +---+
  |   |
  O   |
 /|   |
      |
      |
=========''', '''
  +---+
  |   |
  O   |
 /|\  |
      |
      |
=========''', '''
  +---+
  |   |
  O   |
 /|\  |
 /    |
      |
=========''', '''
  +---+
  |   |
  O   |
 /|\  |
 / \  |
      |
=========''']

    def print(self, word: str, letters: str, tries: int, win: bool):
        self.clear()
        if (win):
            print('Congrats! You win! :D\n')
        elif(tries == 0):
            print('Sorry! You lost :(\n')
            print(f'The word is {word}')

        print(
            ' '.join([letter if letter in letters else '_' for letter in word]))
        print('\n')
        print(Display.HANGMANPICS[::-1][tries])
        print('\n')

    def clear(self):
        os.system('clear')

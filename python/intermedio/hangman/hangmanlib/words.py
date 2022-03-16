"""Get random word of database of words"""


from random import choice
from typing import List


def get_random_word(file: str) -> str:
    """Return a word"""

    with open(file=file, mode='r', encoding='utf-8') as f:
        words: List[str] = list(f.readlines())
    return choice(words)

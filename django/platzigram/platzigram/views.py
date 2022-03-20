"""Platzigram views"""

# Django
import numbers
from django.http import HttpResponse, JsonResponse

# Utilities
from datetime import datetime


def hello_word(request):
    """Return hello world"""
    now = datetime.now().strftime('%b %dth, %Y - %H:%M')
    return HttpResponse(f'Oh, hi! Current server time is {now}')


def hi(request):
    """hi!"""
    # import pdb; pdb.set_trace()
    return HttpResponse('Hi!')


def sorted_numbers(request):
    """Return a JSON response with sorted numbers given"""
    given_numbers = request.GET['numbers'].split(',')

    numbers = [
        int(number) for number in given_numbers
    ]
    numbers.sort()

    data = {
        "status": "Ok",
        "data": numbers,
        "message": 'Sorted numbers',
    }

    return JsonResponse(data)


def say_hi(request, name, age):
    """Return a greeting."""

    if age < 12:
        message = f"Sorry {name}, you are not allowed here"
    else:
        message = f"Hello, {name}!, Welcome to Platzigram"
    return HttpResponse(message)
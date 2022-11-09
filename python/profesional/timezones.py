from datetime import datetime
import pytz


def now(timezone):
    my_timezone = pytz.timezone(timezone)
    my_date = datetime.now(my_timezone)
    
    print(f"Now in {timezone}: {my_date.strftime('%c')}")


now('America/Bogota')
now('America/Mexico_City')
now('UTC')


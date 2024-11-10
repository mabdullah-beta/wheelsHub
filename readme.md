## Backend
First create a new virtual enviroment in the root directory

```shell
python -m venv venv
```

Then activate 

```shell
source venv/bin/activate
```

Then navigate to backend and run the server with

```shell
python manage.py runserver
```

There are two core files. Go to `backend/wheelshub` and add your routes to `views.py` and then include the routes through `backend/backend/urls.py` file.

Super user is admin

```
wheelshub
adminadmin
```

You can start a new shell

```shell
python manage.py shell
```

Then inside shell import the model and insert new data into db

```python
# Import the model
from wheelshub.models import Deal 

# Define a new deal
deal = Deal()

# And write into db
deal.save()
```
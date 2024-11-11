## Backend
First create a new virtual enviroment in the root directory

```shell
python -m venv venv
```

Then activate 

```shell
source venv/bin/activate
```

Then install the packages
```shell
pip install -r requirements.txt
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

For the query route
```shell
/deals/?title=sedan&make=toyota&year=2022&price_min=10000&price_max=30000&transmission=automatic&location=new+york
```

For auth there is registration route
```shell
curl -X POST http://localhost:8000/users/register/ -d '{"username": "testuser", "password": "testpass"}' -H "Content-Type: application/json"
```

For login
```shell
curl -X POST http://localhost:8000/api/token/ -d '{"username": "testuser", "password": "testpass"}' -H "Content-Type: application/json"
```

And protected routes will get
```shell
curl -X GET http://localhost:8000/auth/user -H "Authorization: Bearer token"
```
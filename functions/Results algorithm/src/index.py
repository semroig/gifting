from appwrite.client import Client

# You can remove imports of services you don't use
from appwrite.services.account import Account
from appwrite.services.avatars import Avatars
from appwrite.services.databases import Databases
from appwrite.services.functions import Functions
from appwrite.services.health import Health
from appwrite.services.locale import Locale
from appwrite.services.storage import Storage
from appwrite.services.teams import Teams
from appwrite.services.users import Users

"""
  'req' variable has:
    'headers' - object with request headers
    'payload' - request body data as a string
    'variables' - object with function variables

  'res' variable has:
    'send(text, status)' - function to return text response. Status code defaults to 200
    'json(obj, status)' - function to return JSON response. Status code defaults to 200

  If an error is thrown, a response with code 500 will be returned.
"""


def main(req, res):

  """Initialize the Appwrite client"""
  client = Client()
  client.set_endpoint(req.variables.get("APPWRITE_ENDPOINT"))
  client.set_project(req.variables.get("APPWRITE_FUNCTION_PROJECT_ID"))
  client.set_key(req.variables.get("APPWRITE_API_KEY"))

  # You can remove services you don't use
  account = Account(client)
  avatars = Avatars(client)
  database = Databases(client)
  functions = Functions(client)
  health = Health(client)
  locale = Locale(client)
  storage = Storage(client)
  teams = Teams(client)
  users = Users(client)

  # Write logic here!
  payload = req.payload or 'No payload provided. Add custom data when executing function.'
  eventData = req.variables.get('APPWRITE_FUNCTION_EVENT_DATA')
  print("payload", payload)
  print("eventData", eventData)

  result = database.list_documents(
    req.variables.get("DATABASE_ID"), req.variables.get("QUESTIONS_COLLECTION_ID")
  )
  print('result', result)

  return res.json({
    "areDevelopersAwesome": True,
  })
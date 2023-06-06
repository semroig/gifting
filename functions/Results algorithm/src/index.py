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
  eventData = req.variables.get('APPWRITE_FUNCTION_EVENT_DATA')
  print("eventData", eventData)
  
  # filter context (needs to be on quiz record creation)

  try:

    # Retrieve all products available
    result = database.list_documents(
      req.variables.get("DATABASE_ID"),
      req.variables.get("PRODUCTS_COLLECTION_ID")
    )

    # Iterate trought records and append to list posibles
    posibles = []
    for document in result['documents']:
      print(document['Category'])

      if 'Tech' in document['Category']:
        posibles.append(document['Description'])
    
    print('posibles', posibles)

    #  Update Quiz record with 3 product ids
  
  except Exception as e:
    print('error', e)

  return res.json({
    "areDevelopersAwesome": True,
  })
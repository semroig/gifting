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

import json


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
  eventData = req.variables.get('APPWRITE_FUNCTION_EVENT_DATA') or None
  print("eventData", eventData)

  # filter context (needs to be on quiz record creation)
  if eventData:
    # Turn str into dict
    eventData = json.loads(eventData)
    if eventData['$collectionId'] != req.variables.get("QUIZES_COLLECTION_ID"):
      return res.json({
        "wasEventContext": True,
        "wasQuizCollection": False
      })

    # Everything else
    try:
      
      # Retrieve all products available
      result = database.list_documents(
        req.variables.get("DATABASE_ID"),
        req.variables.get("PRODUCTS_COLLECTION_ID")
      )

      # Iterate trought records and append to list
      posibles = set()
      for document in result['documents']:
        if eventData['YesCategories']:

          for quizCategory in eventData['YesCategories']:
            if quizCategory in document['Category']:
              posibles.add(document['Description'])

      # Falta eliminar los que no

      # Falta entregar 3 elementos random de los posibles
      
      print('posibles', posibles)

    except Exception as e:
      print('error', e)

    return res.json({
      "wasEventContext": True,
      "wasQuizCollection": True
    })

  # Return dif event context
  return res.json({
    "wasEventContext": False,
  })
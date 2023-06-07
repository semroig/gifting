from appwrite.client import Client
from appwrite.services.databases import Databases

import json
import random


def main(req, res):

  """Initialize the Appwrite client"""
  client = Client()
  client.set_endpoint(req.variables.get("APPWRITE_ENDPOINT"))
  client.set_project(req.variables.get("APPWRITE_FUNCTION_PROJECT_ID"))
  client.set_key(req.variables.get("APPWRITE_API_KEY"))

  database = Databases(client)

  eventData = req.variables.get('APPWRITE_FUNCTION_EVENT_DATA') or None

  # Filter context (needs to be on quiz record creation)
  if eventData:
    eventData = json.loads(eventData)
    if eventData['$collectionId'] != req.variables.get("QUIZES_COLLECTION_ID"):
      return res.json({
        "wasEventContext": True,
        "wasQuizCollection": False
      })

    # Retrieve all products available
    prodRecords = database.list_documents(
      req.variables.get("DATABASE_ID"),
      req.variables.get("PRODUCTS_COLLECTION_ID")
    )

    # Iterate trought records and append to list
    posibles = set()
    for document in prodRecords['documents']:
      isGoodFit = False

      # the 'yes' categories
      if eventData['YesCategories']:
        for quizCategory in eventData['YesCategories']:
          if quizCategory in document['Category'] or 'General' in document['Category']:
            isGoodFit = True

      # the 'no' categories
      if eventData['NoCategories']:
        for quizCategory in eventData['NoCategories']:
          if quizCategory in document['Category']:
            isGoodFit = False
      
      if isGoodFit == True:
        posibles.add(document['$id'])

    # Reduce the list into 3 random elements
    posibles = list(posibles)
    for i in range(len(posibles) - 3):
      del posibles[random.randint(0,len(posibles) - 1)]
          
    # update quiz record adding prod ids
    result = database.update_document(
      req.variables.get("DATABASE_ID"),
      req.variables.get("QUIZES_COLLECTION_ID"),
      eventData['$id'],
      data = {"Results": posibles}
    )

    return res.json({
      "wasEventContext": True,
      "wasQuizCollection": True
    })

  # Return dif event context
  return res.json({
    "wasEventContext": False,
  })
import pymongo
import os
from dotenv import load_dotenv
load_dotenv('../.env')

pymongo_client=os.environ.get("PYMONGO_CLIENT")

mongo_database_name = 'smartDB'
mongo_collection_name = 'products'

db_client = pymongo.MongoClient(pymongo_client)
db = db_client[mongo_database_name]
collection = db[mongo_collection_name]

database_return = collection.find()
categoriesList=[]
for i in database_return:
    categories = i['product_category_tree'].split(" , ")
    for j in categories:
        if j not in categoriesList:
            categoriesList.append(j)

'''
f=open("categories.txt","w")
for i in categoriesList:
    f.write(i+"\n")
f.close()
'''

db_client.close()


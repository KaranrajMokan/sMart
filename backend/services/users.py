#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Created on Fri Nov 12 18:19:57 2021

@author: karanrajmokan
"""

import pymongo
import os
from dotenv import load_dotenv
load_dotenv('../.env')

pymongo_client=os.environ.get("PYMONGO_CLIENT")

mongo_database_name = 'smartDB'
mongo_collection_name = 'users'

db_client = pymongo.MongoClient(pymongo_client)
db = db_client[mongo_database_name]
collection = db[mongo_collection_name]

database_return = collection.find({"username":"sathwik"})
for i in database_return:
    print(i)
   
db_client.close()
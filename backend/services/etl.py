#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Created on Sat Sep 25 19:20:53 2021

@author: karanrajmokan
"""

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
f = open("etl_data.txt", "w")
for i in database_return:
    name = i['product_name']
    string = name +"\n"
    f.write(string)    

f.close()
db_client.close()


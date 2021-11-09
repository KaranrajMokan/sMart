#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Created on Fri Oct 22 10:08:51 2021

@author: karanrajmokan
"""

import pymongo
import os
from dotenv import load_dotenv
import json
load_dotenv('../.env')

pymongo_client=os.environ.get("PYMONGO_CLIENT")

mongo_database_name = 'smartDB'
mongo_collection_name = 'products'

db_client = pymongo.MongoClient(pymongo_client)
db = db_client[mongo_database_name]
collection = db[mongo_collection_name]

db_results = collection.find().limit(100)

categories = ['Clothing','Watches','Jewellery']
recommendations=[]
for i in db_results:
    cat = i['product_category_tree'].split(" , ")
    if any(i in cat for i in categories):
        del i['product_url']
        del i['_id']
        if 'brand' in i.keys():
            del i['brand']
        recommendations.append(i)
        
        
print("The number of recommended products is",recommendations[0][0])

db_client.close()


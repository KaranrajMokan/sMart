#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Created on Fri Oct 22 11:31:28 2021

@author: karanrajmokan
"""

import pymongo
import os
from dotenv import load_dotenv
from bson.json_util import dumps, loads
load_dotenv('../.env')

pymongo_client=os.environ.get("PYMONGO_CLIENT")

db_client = pymongo.MongoClient(pymongo_client)
db = db_client['smartDB']
cart = db['cart']
transaction = db['transaction']

database_return = cart.find({"username":"karan"})
#cart.delete_one({"username":"karan"})

database_return = loads(dumps(database_return))[0]
database_return['transaction_id'] = database_return['_id']
del database_return['_id']
ids = transaction.insert_one(database_return)


db_client.close()
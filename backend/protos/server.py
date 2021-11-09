import grpc
from concurrent import futures
import time

# import the generated classes
import recommendation_pb2
import recommendation_pb2_grpc


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

class GenratorServicer(recommendation_pb2_grpc.GenratorServicer):
    def SendItems(self, request, context):
        
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
        print(recommendations[0])
        db_client.close()
        return recommendation_pb2.ResponseItems(**recommendations[0])

server = grpc.server(futures.ThreadPoolExecutor(max_workers=10))

recommendation_pb2_grpc.add_GenratorServicer_to_server(
GenratorServicer(), server)

# listen on port 50051
print('Starting server. Listening on port 50051.')
server.add_insecure_port('[::]:50051')
server.start()
server.wait_for_termination()



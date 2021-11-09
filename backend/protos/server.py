import grpc
from concurrent import futures
import time

# import the generated classes
import Recommendation_pb2
import Recommendation_pb2_grpc


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

db_results = collection.find().limit(100)

class GenratorServicer(Recommendation_pb2_grpc.GenratorServicer):
    def SendItems(self,request, context):
        response = Recommendation_pb2.ResponseItems()
        categories = ['Clothing','Watches','Jewellery']
        recommendations=[]
        for i in db_results:
            cat = i['product_category_tree'].split(" , ")
            if any(i in cat for i in categories):
                recommendations.append(i)

        response.value = recommendations
        db_client.close()
        return response

server = grpc.server(futures.ThreadPoolExecutor(max_workers=10))

Recommendation_pb2_grpc.add_GenratorServicer_to_server(
        GenratorServicer(), server)

# listen on port 50051
print('Starting server. Listening on port 50051.')
server.add_insecure_port('[::]:50051')
server.start()

try:
    while True:
        time.sleep(86400)
except KeyboardInterrupt:
    server.stop(0)

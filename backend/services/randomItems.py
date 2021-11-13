import tornado.escape
import tornado.ioloop
import tornado.web
import pymongo
import os
import json
from bson import json_util
from dotenv import load_dotenv
load_dotenv('../.env')

class RandomItems(tornado.web.RequestHandler):
    
    def initialize(self):
        pymongo_client=os.environ.get("PYMONGO_CLIENT")
        db_client = pymongo.MongoClient(pymongo_client)
        db = db_client['smartDB']
        self.products = db['products']
        
    def get(self):
        db_results = self.products.aggregate([{ "$sample": { "size": 50 } }])
        productsList = list(db_results)
        self.finish({"productsList" : json.loads(json_util.dumps(productsList))})
        
    def post(self):
        self.write("...post")

def make_app():
    return tornado.web.Application([
        (r"/app/random", RandomItems)])

if __name__ == "__main__":
    app = make_app()
    app.listen(8081)
    print("RandomItems Service is listening on port: 8081")
    tornado.ioloop.IOLoop.current().start()

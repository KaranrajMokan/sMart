import tornado.escape
import tornado.ioloop
import tornado.web
import pymongo
import os
import json
from bson import json_util
from dotenv import load_dotenv
load_dotenv('../.env')

class Recommender(tornado.web.RequestHandler):
 
    def set_default_headers(self):
        self.set_header("Access-Control-Allow-Origin", "*")
        self.set_header("Access-Control-Allow-Headers", "x-requested-with")
        self.set_header('Access-Control-Allow-Methods', 'POST, GET, OPTIONS')    
 
    def initialize(self):
        pymongo_client=os.environ.get("PYMONGO_CLIENT")
        db_client = pymongo.MongoClient(pymongo_client)
        db = db_client['smartDB']
        self.products = db['products']
    
    def get(self):
        categories = tornado.escape.json_decode(self.request.body)
        print(categories)
        db_results = self.products.find().limit(100)
        recommendations=[]
        for i in db_results:
            cat = i['product_category_tree'].split(" , ")
            if any(i in cat for i in categories):
                recommendations.append(i)
        self.finish({"productsList" : json.loads(json_util.dumps(recommendations))})
        
    def post(self):
        self.write("...post")

def make_app():
    return tornado.web.Application([
        (r"/app/recommender", Recommender)])

if __name__ == "__main__":
    app = make_app()
    app.listen(8084)
    print("Recommendation Service is listening on port: 8084")
    tornado.ioloop.IOLoop.current().start()

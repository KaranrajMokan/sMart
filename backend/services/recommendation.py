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
        categories = self.get_argument('categories')
        if categories != "":
            categories = categories.split(",")
            if len(categories) == 1:
                db_results = self.products.find({ "product_categories" : categories[0]})
            else:
                db_results = self.products.find({"product_categories" : {
                    "$in" : categories}})
            
            recommendations=[]
            for i in db_results:
                recommendations.append(i)
            print("Fetched",len(recommendations),"products for",",".join(categories))
            self.finish({"productsList" : json.loads(json_util.dumps(recommendations))})
            
            
    def post(self):
        self.write("...post")

def make_app():
    return tornado.web.Application([
        (r"/app/recommender", Recommender)])

if __name__ == "__main__":
    app = make_app()
    app.listen(8082)
    print("Recommendation Service is listening on port: 8082")
    tornado.ioloop.IOLoop.current().start()

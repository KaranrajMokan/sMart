import tornado.escape
import tornado.ioloop
import tornado.web
import pymongo
import os
import json
from bson import json_util
from dotenv import load_dotenv
load_dotenv('../.env')

class Cart(tornado.web.RequestHandler):

    def set_default_headers(self):
        self.set_header("Access-Control-Allow-Origin", "*")
        self.set_header("Access-Control-Allow-Headers", "x-requested-with")
        self.set_header('Access-Control-Allow-Methods', 'POST, GET, OPTIONS')
    
    def initialize(self):
        pymongo_client=os.environ.get("PYMONGO_CLIENT")
        db_client = pymongo.MongoClient(pymongo_client)
        db = db_client['smartDB']
        self.cart = db['cart']
    
    def get(self):
        username = self.get_argument('username')
        db_results = self.cart.find({"username":username})
        self.finish({"cartList" : json.loads(json_util.dumps(db_results))})
        
    def post(self):
        username = self.get_argument('username')
        products = self.get_argument('products')
        products = json.loads(products)
        price=0
        price += int(products['discount_price'])*int(products['quantity'])
        db_results = self.cart.find({"username":username})
        length = len(list(db_results))
        if length == 0:
            productsList = [products]
            dictionary = {
                "username":username,
                "products_list":productsList,
                "final_price":price}
            self.cart.insert_one(dictionary)
        elif length != 0:
            productsList=[]
            db_results = self.cart.find({"username":username})
            for i in db_results:
                productsList=i['products_list']
            for i in productsList:
                price += int(i['discount_price'])*int(i['quantity'])
            productsList.append(products)
            self.cart.update_many({"username":username},{
                "$set" : { "products_list" : productsList, "final_price" : price }})
        self.write({"Updation":True})

def make_app():
    return tornado.web.Application([
        (r"/app/cart", Cart)])

if __name__ == "__main__":
    app = make_app()
    app.listen(8083)
    print("Cart Service is listening on port: 8083")
    tornado.ioloop.IOLoop.current().start()

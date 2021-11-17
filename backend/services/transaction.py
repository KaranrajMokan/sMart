import tornado.escape
import tornado.ioloop
import tornado.web
import pymongo
import os
import json
from bson import json_util
from dotenv import load_dotenv
load_dotenv('../.env')

class Transaction(tornado.web.RequestHandler):
    
    def set_default_headers(self):
        self.set_header("Access-Control-Allow-Origin", "*")
        self.set_header("Access-Control-Allow-Headers", "x-requested-with")
        self.set_header('Access-Control-Allow-Methods', 'POST, GET, OPTIONS')
    
    def initialize(self):
        pymongo_client=os.environ.get("PYMONGO_CLIENT")
        db_client = pymongo.MongoClient(pymongo_client)
        db = db_client['smartDB']
        self.cart = db['cart']
        self.transaction = db['transaction']
        
    def get(self):
        username = self.get_argument('username')
        db_results = self.transaction.find({"username":username})
        transactions = list(db_results)
        print("The number of fetched transactions for",username,"is",len(transactions))
        self.write({"transactionsList" : json.loads(json_util.dumps(transactions))})
        
    def post(self):
        username = self.get_argument('username')
        date = self.get_argument('date')
        db_results = self.cart.find_one({"username":username})
        self.cart.delete_one({"username":username})
        results = dict(db_results)
        results['transaction_id'] = results.pop('_id')
        results['date'] = date
        results['payment_mode'] = "Bitcoin(BTC)"
        self.transaction.insert_one(results)
        print("Updated Transactions")
        self.write({"Updation" : True})

def make_app():
    return tornado.web.Application([
        (r"/app/transaction", Transaction)])

if __name__ == "__main__":
    app = make_app()
    app.listen(8084)
    print("Transaction Service is listening on port: 8084")
    tornado.ioloop.IOLoop.current().start()   
    
import tornado.escape
import tornado.ioloop
import tornado.web
import pymongo
import os
from dotenv import load_dotenv
load_dotenv('../.env')

class Login(tornado.web.RequestHandler):
    
    def set_default_headers(self):
        self.set_header("Access-Control-Allow-Origin", "*")
        self.set_header("Access-Control-Allow-Headers", "x-requested-with")
        self.set_header('Access-Control-Allow-Methods', 'POST, GET, OPTIONS')
    
    def initialize(self):
        pymongo_client=os.environ.get("PYMONGO_CLIENT")
        db_client = pymongo.MongoClient(pymongo_client)
        db = db_client['smartDB']
        self.users = db['users']
    
    def get(self):
        username = self.get_argument('username')
        password = self.get_argument('password')
        db_results = self.users.find({"username":username})
        Dict={"Authentication" : False}
        for i in db_results:
            if i['username'] == username and i['password'] == password:
                Dict["Authentication"] = True
        self.write(Dict)
               
    def post(self):
        self.write("...post")

def make_app():
    return tornado.web.Application([
        (r"/app/login", Login)])

if __name__ == "__main__":
    app = make_app()
    app.listen(8080)
    print("Login Service listening on port: 8080")
    tornado.ioloop.IOLoop.current().start()
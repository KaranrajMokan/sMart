import tornado.ioloop
import tornado.web

from login import Login
from randomItems import RandomItems
from recommendation import Recommender
from cart import Cart
from transaction import Transaction

class MainHandler(tornado.web.RequestHandler):
    def post(self):
        self.write("sMart Microservice v1")

def make_app():
    return tornado.web.Application([
        (r"/app", MainHandler),
        (r"/app/login", Login),
        (r"/app/random", RandomItems),
        (r"/app/recommender", Recommender),
        (r"/app/cart", Cart),
        (r"/app/transaction", Transaction)])

if __name__ == "__main__":
    app = make_app()
    port =8888
    app.listen(port)
    print("Bitches! App listening on port: ",port)
    tornado.ioloop.IOLoop.current().start()


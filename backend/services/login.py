import tornado.ioloop
import tornado.web

'''use self.get_arguements'''
class Login(tornado.web.RequestHandler):
    def get(self):
        self.write("...Login Page")
    def post(self):
        self.write("...post")

def make_app():
    return tornado.web.Application([
        (r"/app/login", Login)])


if __name__ == "__main__":
    app = make_app()
    port = 8080
    app.listen(port)
    print("Bitches! App listening on port: ",port)
    tornado.ioloop.IOLoop.current().start()
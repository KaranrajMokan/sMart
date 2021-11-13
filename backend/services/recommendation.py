#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Created on Fri Oct 22 10:08:51 2021

@author: karanrajmokan
"""

import tornado.ioloop
import tornado.web

'''use self.get_arguements'''
class Recommender(tornado.web.RequestHandler):
    def get(self):
        self.write("...Recommended items")
    def post(self):
        self.write("...post")

def make_app():
    return tornado.web.Application([
        (r"/app/recommender", Recommender)])


if __name__ == "__main__":
    app = make_app()
    port = 8084
    app.listen(port)
    print("Bitches! App listening on port: ",port)
    tornado.ioloop.IOLoop.current().start()


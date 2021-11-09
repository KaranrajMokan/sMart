import grpc

import recommendation_pb2
import recommendation_pb2_grpc


# open a gRPC channel

channel = grpc.insecure_channel('localhost:50051', options=(('grpc.enable_http_proxy', 0),))

stub = recommendation_pb2_grpc.GenratorStub(channel)

# make the call
number = recommendation_pb2.Number(value=16)
response = stub.SendItems(number)

print(response)

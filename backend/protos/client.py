import grpc

import Recommendation_pb2
import Recommendation_pb2_grpc

# open a gRPC channel
channel = grpc.insecure_channel('localhost:50051')

stub = Recommendation_pb2_grpc.GenratorStub(channel)

# make the call
response = stub.SendItems()

print(response.value)
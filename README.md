# SocketIO-Cluster-RedisPubSub
Clustering socket IO application uses a socket-io with Redis Pub/Sub

It can connect with different clients on different a worker.
For this functionality I use Redis Pub/Sub.

Usage:
node app

in browser:
    - go to URL localhost:4000/send
    - open this URL in several browsers tab.

In the server logs you can see, each connection will be connected by socketIO to different workers PID
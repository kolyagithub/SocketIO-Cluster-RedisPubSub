# SocketIO-Cluster-RedisPubSub
Clustering socket IO application uses a socket-io with Redis Pub/Sub

It can connect with different clients on different a worker.
For this functionality I use Redis Pub/Sub.

# Requirements
node
npm

# Dependencies
redis
socket-io
express
underscore

# Installation
npm install

# Configuration
(config.json)
Edit conf variable with redis port and host. You can also change the chat server port (default 4000)

# Run it
Install Redis and running

Start server
node app.js

in Browser:
    - go to URL localhost:4000/send
    - open this URL in several browsers tab.

In the server logs you can see, each connection will be connected by socketIO to different workers PID
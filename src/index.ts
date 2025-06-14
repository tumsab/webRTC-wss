import { WebSocketServer } from 'ws';
import { UserManager } from './managers/userManager';
import express from 'express';
import http from 'http';

const app = express();
const port = 8080;

// Dummy GET route for Render/UptimeRobot
app.get('/', (_req, res) => {
  res.send('WebSocket server is running');
});

// Create an HTTP server to attach both Express and WebSocket
const server = http.createServer(app);

// Attach WebSocket server to the HTTP server
const wss = new WebSocketServer({ server });
const userManger = new UserManager();

wss.on('connection', function connection(ws) {
  userManger.addUser(ws);

  // Optional: move this outside so it’s not created per connection
  setInterval(() => {
    wss.clients.forEach((client) => {
      client.send(JSON.stringify({ type: 'ping' }));
    });
  }, 30000);
});

server.listen(port, () => {
  console.log(`Server (HTTP + WebSocket) is running on port ${port}`);
});

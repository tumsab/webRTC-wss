"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ws_1 = require("ws");
const userManager_1 = require("./managers/userManager");
const wss = new ws_1.WebSocketServer({ port: 8080 });
const userManger = new userManager_1.UserManager();
wss.on('connection', function connection(ws) {
    userManger.addUser(ws);
    setInterval(() => {
        wss.clients.forEach((ws) => {
            ws.send(JSON.stringify({ type: "ping" }));
        });
    }, 30000);
});

#!/usr/bin/env node

/**
 * Module dependencies.
 */

import * as debug from "debug";
import * as http from "http";
import { Server } from "../server";

const iDebugger = debug("express:server");

/**
 * Get port from environment and store in Express.
 */
const httpPort = normalizePort(process.env.PORT || 3000);
const app = Server.bootstrap().app;
app.set("port", httpPort);
const httpServer = http.createServer(app);

// listen on provided ports
httpServer.listen(httpPort);

// add error handler
httpServer.on("error", onError);

// start listening on port
httpServer.on("listening", onListening);

/**
 * Normalize a port into a number, string, or false.
 */
function normalizePort(val): number {
    const port = parseInt(val, 10);

    if (isNaN(port)) {
        // named pipe
        return val;
    }

    if (port >= 0) {
        // port number
        return port;
    }

    throw new Error("cannot resolve port.");
}

/**
 * Event listener for HTTP server "error" event.
 */
function onError(error: any): void {
    if (error.syscall !== "listen") {
        throw error;
    }

    const bind = typeof httpPort === "string"
        ? "Pipe " + httpPort
        : "Port " + httpPort;

    // handle specific listen errors with friendly messages
    switch (error.code) {
        case "EACCES":
            console.error(bind + " requires elevated privileges");
            process.exit(1);
            break;
        case "EADDRINUSE":
            console.error(bind + " is already in use");
            process.exit(1);
            break;
        default:
            throw error;
    }
}

/**
 * Event listener for HTTP server "listening" event.
 */
function onListening(): void {
    const addr = httpServer.address();
    const bind = typeof addr === "string"
        ? "pipe " + addr
        : "port " + addr.port;
    iDebugger("Listening on " + bind);
    console.log("Listening on " + bind);
}

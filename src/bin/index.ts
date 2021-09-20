#!/usr/bin/env node

/**
 * Module dependencies.
 */
require('dotenv').config(); // can be done on runtime.
import { logger } from '@sunriseupc/nodejs-common';
import app from '../app';

/**
 * Normalize a port into a number, string, or false.
 */

const normalizePort = (val: string) => {
    const port = parseInt(val, 10);

    if (isNaN(port)) {
        // named pipe
        return val;
    }

    if (port >= 0) {
        // port number
        return port;
    }

    return false;
};

/**
 * Event listener for HTTP server "error" event.
 */

const onError = (error: { syscall: string; code: any }) => {
    if (error.syscall !== 'listen') {
        throw error;
    }

    var bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port;

    // handle specific listen errors with friendly messages
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use');
            process.exit(1);
            break;
        default:
            throw error;
    }
};

/**
 * Get port from environment and store in Express.
 */

const port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

/**
 * Create HTTP server.
 */

// var server = http.createServer(app);
const server = app.listen(port, () => {
    logger.error(`Server is running on port ${port}.`);
});

/**
 * Listen on provided port, on all network interfaces.
 */

server.on('error', onError);
// server.on('listening', onListening);

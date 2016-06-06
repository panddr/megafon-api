import path from 'path';
import bodyParser from 'body-parser';
import express from 'express';
import http from 'http';
import socketIO from 'socket.io';
import config from 'config';

import * as api from './server/api/http';
import * as eventService from './server/api/service/event';
import * as uni from './server/app.js';

delete process.env.BROWSER;

const app = express();
const httpServer = http.createServer(app);
const port = config.get('express.port') || 3000;

var io = socketIO(httpServer);

app.set('views', path.join(__dirname, 'server', 'views'));
app.set('view engine', 'ejs');

/**
 * Server middleware
 */
app.use(require('serve-static')(path.join(__dirname, config.get('buildDirectory'))));
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({
  extended: true,
  limit: '5mb'
}));
app.use(bodyParser.json({
  limit: '5mb'
}));

/**
 * API Endpoints
 */
app.get('/api/0/events', api.getEvents);
app.post('/api/0/events', api.addEvent);
app.post('/api/0/events/:id', api.editEvent);
app.delete('/api/0/events/:id', api.deleteEvent);
// app.get('/project/:slug', api.getEvent);
app.post('/api/0/images', api.uploadImage);

app.get('/favicon.ico', (req, res) => res.sendFile(path.join(__dirname, 'images', 'favicon.ico')));

/**
 * Universal Application endpoint
 */
app.get('*', uni.handleRender);

eventService.liveUpdates(io);

httpServer.listen(port);

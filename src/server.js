const express = require('express');
const path = require('path');
const nunjucks = require('nunjucks');

const { subjects, weekdays, getSubject } = require('./utils/format');
const {
  pageLanding,
  pageStudy,
  pageGiveClasses,
  saveClasses,
  successWaitingScreen,
} = require('./pages');
const Database = require('./database/db');

const server = express();
nunjucks.configure('src/views', { express: server, noCache: true });

server
  .use(express.static(path.resolve('public')))
  .use(express.urlencoded({ extended: true }));
server
  .get('/', pageLanding)
  .get('/study', pageStudy)
  .get('/give-classes', pageGiveClasses)
  .get('/success', successWaitingScreen)
  .post('/give-classes', saveClasses);

server.listen('3000');

const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');

const adapter = new FileSync('data.json');
const db = low(adapter);

app.use(express.static('./static'));

app.listen(port);
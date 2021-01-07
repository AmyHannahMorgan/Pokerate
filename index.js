const e = require('express');
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');

const adapter = new FileSync('data.json');
const db = low(adapter);

let pastMons = [];

app.use(express.static('./static'));

app.post('/api/rate', (req, res) => {
    let win = db.get('mons').find({'id': parseInt(req.query.win)});
    let loss = db.get('mons').find({'id': parseInt(req.query.loss)});

    if(win.value() && loss.value()) {
        win.update('wins', n => n + 1).write();
        loss.update('losses', n => n + 1).write();
        console.log(win.value())
        console.log(loss.value())
        res.sendStatus(200);
    }
    else {
        res.sendStatus(404);
    }
});

app.get('/api/check', (req, res) => {
    if(req.query.id) {
        let mon = db.get('mons').find({ 'id': parseInt(req.query.id) }).value();
        console.log(mon);
        if(mon) res.send(mon)
        else res.sendStatus(404);
    }
});

app.get('/api/match', (req, res) => {
    let mons = [getRandomMon(), getRandomMon()];
    console.log(mons);
    res.send(mons);
})

app.listen(port);

function getRandomMon() {
    let monID = RNGInclusive(0, db.get('mons').value().length);

    if(pastMons.find(element => element === monID)) {
        return getRandomMon()
    }
    else {
        if(pastMons.length === 100) pastMons.shift();
        pastMons.push(monID);
        return db.get('mons').find( {'id': monID} ).value();
    }
}

function RNGInclusive(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}
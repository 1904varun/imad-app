var express = require('express');
var morgan = require('morgan');
var path = require('path');


var config = {
    host: 'db.imad.hasura-app.io',
    user: 'varunsrivastava1904',
    password: 'db-varunsrivastava1904-19261',
    database: 'varunsrivastava1904',
    port:'5432'
};

var Pool = require('pg').Pool;
var pool = new Pool(config);

var app = express();
app.use(morgan('combined'));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});

app.get('/dbtest', function(req, res) {
    console.log('start');
    pool.query('SELECT * FROM test', function (err, result){
        if (err) {
            res.status(500).send(err.toString());
        } else {
            res.send(JSON.stringify(result));
        }
    });
    console.log('end');
    
});

var port = 80; // Use 8080 for local development because you might already have apache running on 80
app.listen(port, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});

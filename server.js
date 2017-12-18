var fs = require('fs');
var express = require('express');
var app = express();

app.set('port', process.env.PORT || 8990);

var staticOptions = {
  setHeaders: function (res, path, stat) {
    res.header('Access-Control-Allow-Origin', '*')
  }
}
app.use(express.static(__dirname + '/public', staticOptions));
app.use('/js', express.static(__dirname + '/public/js/'));
app.use('/css', express.static(__dirname + '/public/css/'));

// //- import jquery
// script(type='text/javascript', src='https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js');
// // import custom script
// script(type='text/javascript', src='./script.js');

var port = app.get('port');
var defaultCharset = 'utf8';

/* Gets a list of courses, replacing urls  */
function getCoursesFromFile(fileName, req) {
    var data = fs.readFileSync(fileName, defaultCharset);
    var courses = JSON.parse(data);

    for (var i in courses) {
        courses[i].cover = replaceUrl(courses[i].cover, req);
    }
    return JSON.stringify(courses);
}

/* Replaces 'localhost:8080' url with actual server url */
function replaceUrl(data, req) {
    var host = req.protocol + '://' + req.hostname + (process.env.NODE_ENV == "production" || port == 80 || port == 443 ? '' : ':' + port);
    return data.replace(/http:\/\/localhost:8080/g, host);
}

/* courses List */
app.get('/courses', function(req, res) {
    res.header('Access-Control-Allow-Origin', '*');
    res.type('application/json; charset=' + defaultCharset);
    res.status(200).send(getCoursesFromFile('data/courses_list.json', req));
});

/* Default (home page) */
app.get('^*$', function(req, res) {
    var data = fs.readFileSync('data/index.html', defaultCharset);
    data = replaceUrl(data, req);

    res.type('text/html; charset=' + defaultCharset);
    res.status(200).send(data);
});

/* Starts server */
app.listen(port, function () {
    console.log('Express server listening on port ' + port);
});

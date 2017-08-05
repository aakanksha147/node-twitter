var express=	require('express'); 
var app= 		express();
var port=		process.env.PORT || 8080;
var morgan=		require('morgan'); //logging request details functon produce log entry
var bodyParser =require('body-parser'); //to read http post data
var router = 	express.Router();//define router
var path =  	require('path');
var cookieParser = require('cookie-parser');

var index = require('./routes/index');
var tweets = require('./routes/tweets');

//middleware
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');
app.engine('.html', require('ejs').renderFile);


app.use(morgan('dev')); //start logged in request
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({extended:false}));
app.use(cookieParser());
app.use(express.static(__dirname + '/public'));


app.use('/', index);
app.use('/tweets', tweets);


if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
};

app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

app.listen(port, function(){
	console.log("running the server", + port);
});
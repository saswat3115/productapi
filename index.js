var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var db = require('./repo');

var port = 8086;
app.listen(port);

app.disable('x-powered-by');
app.use(express.static(__dirname)); // set the static files location /public/img will be /img for users
app.use(bodyParser.urlencoded({
    'extended': 'true'
})); // parse application/x-www-form-urlencoded
app.use(bodyParser.json()); // parse application/json
app.use(bodyParser.json({
    type: 'application/vnd.api+json'
})); // parse application/vnd.api+json as json
app.use(methodOverride());

console.log("API started on port: " + port);

app.get('/', function(req, res){    
    res.send(res.sendFile(__dirname + '/index.html'));
});

app.get('/search', function(req, res){
    var item = db.findByBrandAndCategory('Amul', 'milk');
    res.send(makeResponseObject(item[0], 'allmatch'));
});

function prepareSpeechText(data){
    return data.brand + " " + data.category + 
            " is availabe on aisle " + data.location.aisle +            
            " self " + data.location.shelf +
            " at " + data.location.orientation;
}

function prepareSuggestSpeechText(data){
    let itemList = "";
    for(var item in data){
        itemList = itemList + " " + data.brand;
    }
    return "we have " + itemList;
}

function makeResponseObject(result, filterType){
    var speech = "Sorry this item is not available ! Would you like any alternate";
    if(filterType == "allmatch"){
        speech = prepareSpeechText(result);         
    }
    else if(filterType == "category"){
        speech = prepareSuggestSpeechText(result);         
    }
    return {
        "speech" : speech,
        "displayText": speech
    };
}


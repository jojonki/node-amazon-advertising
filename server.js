
var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var security = require('./security.js');
var  serveIndex = require('serve-index');

// amazon
var util = require('util'),
    OperationHelper = require('apac').OperationHelper;

var parseString = require('xml2js').parseString;

var option = {};
app.get('/search/:key', function(req, res) {
  option.track = req.params.key;
  search(option);
  res.sendStatus(200);
});

app.use(express.static(__dirname + '/public'));
app.use(serveIndex(__dirname + '/public'));
server.listen(3000);

var search = function(option) {
  console.log('search:', option.track);

  var opHelper = new OperationHelper({
      awsId     : security.awsId,
      awsSecret : security.awsSecret,
      assocId   : security.assocId,
      endPoint  : 'ecs.amazonaws.jp'
  });

  opHelper.execute('ItemSearch', {
    'SearchIndex': 'All',
    'Keywords': option.track,
    'ResponseGroup': 'ItemAttributes,Offers,Images,Reviews,IsEligibleForSuperSaverShipping',
    'MerchantId': 'All'
  }, function(err, resultXml) {
    // http://docs.aws.amazon.com/AWSECommerceService/latest/DG/AnatomyofaResponse.html
    parseString(resultXml, function (err, results) {
      if(err) {
        cosole.log(err);
      } else {
        if(results.hasOwnProperty('ItemSearchResponse')) {
          var items = results.ItemSearchResponse.Items[0].Item;
          console.log(items[0]);
          // results.ItemSearchResponse.Items.forEach(function(item) {;
          //   console.log(item); 
          // });
          io.sockets.emit('SearchResults', {items: items});
        } else {
          console.log('results doee not have ItemSearchResponse property');
        }
      }
    });
  });

};

io.sockets.on('connection', function(socket) {
  socket.on('msg', function(data) {
    io.sockets.emit('msg', data);
  });
});



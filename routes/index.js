var util = require('util'),
    Security = require('../security.js')
    OperationHelper = require('apac').OperationHelper;

exports.index = function(req, res){
  var query = req.query.query;
  if(query) {
    console.log(query);
    search('jp', query, function(items) {
      res.render('index', { title: 'Amazon Price Compare', items: items });
    });
  } else {
    res.render('index', { title: 'Amazon Price Compare', items: []});
  }
};

function search(domain, query, callback) {
  var opHelper = new OperationHelper({
    awsId     : Security.awsId, 
    awsSecret : Security.awsSecret, 
    assocId   : Security.assocId,
    endPoint: 'ecs.amazonaws.' + domain
  });

  console.log('search query', query);
  opHelper.execute('ItemSearch', {
    'SearchIndex': 'All',
    'Keywords': query,
    'ResponseGroup': 'Offers,ItemAttributes,Images,Reviews'
  }, function(results, body) {
    if(results.ItemSearchResponse === undefined) {
      console.log('results is undefined');
      return;
    }
    var items = results.ItemSearchResponse.Items[0].Item;
    var data = [];
    items.forEach(function(item, index) {
      var itemAttr = item.ItemAttributes[0];
      
      var author = itemAttr.Author ? itemAttr.Author.join() : '';
      var title = itemAttr.Title? itemAttr.Title[0] : '';
      var url = item.DetailPageURL ? item.DetailPageURL[0] : '';
      var newPrice = item.OfferSummary ? item.OfferSummary[0].LowestNewPrice[0].FormattedPrice[0] : '';
      // var usedPrice = item.OfferSummary ? item.OfferSummary[0].LowestUsedPrice[0] : '';
      // console.log(newPrice);
      var image = item.MediumImage ? item.MediumImage[0].URL[0] : '';
      var hasReviews = item.CustomerReviews[0].HasReviews[0];
      console.log(hasReviews);
      var reviewsFrame = '';
      if(hasReviews === 'true')  reviewsFrame = item.CustomerReviews[0].IFrameURL[0];
      // console.log(reviewsFrame);

      data.push({'author':author, 'title':title, 'price':newPrice, 'url':url, 'image':image, 'reviewsFrame':reviewsFrame});
    });
    callback(data);
  });
}

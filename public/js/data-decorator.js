var Util = Util || {};

Util = (function(module) {
  function getPrice(summary) {
    var price = {};
    price.lowestNew = 
      _.has(summary, 'LowestNewPrice') ?
      summary.LowestNewPrice[0].Amount[0] : '';
    price.lowestUsed = 
      _.has(summary, 'LowestUsedPrice') ?
      summary.LowestUsedPrice[0].Amount[0] : '';

    return price;
  };

  module.decorateData = function(item) {
    return {
      title : item.ItemAttributes[0].Title[0],
      url   : item.DetailPageURL[0],
      image : item.MediumImage[0].URL[0],
      price : getPrice(item.OfferSummary[0]),
      review: item.CustomerReviews[0].IFrameURL
    };
  };
  
  return module;

})(Util);

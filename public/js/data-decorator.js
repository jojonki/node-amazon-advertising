var Util = Util || {};

Util = (function(module) {
  // convert number string to price style
  // ex) "3980" -> "￥3,980円"
  function insertCommaForPrice (str) {
    var retStr = "";
    if(_.isString(str)) {
      retStr = '\￥' + str.replace(/(\d)(?=(\d\d\d)+$)/g, "$1,");
    }

    return retStr;
  }

  function getPrice(summary) {
    var price = {};
    price.lowestNew = 
      _.has(summary, 'LowestNewPrice') ?
      summary.LowestNewPrice[0].Amount[0] : '';
    price.lowestNewStr = insertCommaForPrice(price.lowestNew);

    price.lowestUsed = 
      _.has(summary, 'LowestUsedPrice') ?
      summary.LowestUsedPrice[0].Amount[0] : '';
    price.lowestUsedStr = insertCommaForPrice(price.lowestUsed);

    return price;
  };

  function getIsPrime(offer) {
    var isPrime = offer.OfferListing[0].IsEligibleForSuperSaverShipping[0];
    ifPrime = isPrime === '1' ? true : false;
    return isPrime;
  };

  module.decorateData = function(item) {
    return {
      title : item.ItemAttributes[0].Title[0],
      url   : item.DetailPageURL[0],
      image : item.MediumImage[0].URL[0],
      price : getPrice(item.OfferSummary[0]),
      isPrime: getIsPrime(item.Offers[0].Offer[0]),
      review: item.CustomerReviews[0].IFrameURL
    };
  };
  
  return module;

})(Util);

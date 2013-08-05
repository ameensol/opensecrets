var request = require('request');
var querystring = require('querystring');

function OpenSecretsClient(apiKey){
  var self = this;
  self.apiKey = apiKey;

  function makeRequest(func, args, dataTarget, callback){
    if (!self.apiKey) {
      throw new Error('Must provide apiKey.');
    }

    var options = Options(func, args, self.apiKey);

    return executeRequest(options, dataTarget, callback);
  }

  function executeRequest(options, dataTarget, callback){
    request(options, function (err, res, body) {
      if (res && res.statusCode == 200) {
        callback(null, JSON.parse(body)['response'][dataTarget]);
      } else {
        callback(new Error("Request failed with " + res.statusCode))
      }
    });
  }

  function Options(func, args, apiKey){
    // create the options for the given request

    var params = querystring.stringify(args);

    return {
      url: 'http://api.opensecrets.org/?method=' + func +
        '&output=json&apikey=' + apiKey + '&' + params,
      agent: false,
      headers: {
        "User-Agent": "Mozilla/4.0 (compatible; opensecrets node.js client)",
        "Content-type": "application/x-www-form-urlencoded"
      }
    }
  }

  this.candSummary = function(cid, callback){
    makeRequest('candSummary', {
      "cid": cid
    }, 'summary', callback);
  };

  this.candContrib = function(cid, callback){
    makeRequest('candContrib', {
      "cid": cid
    }, 'contributors', callback);
  };

  this.candIndustry = function(cid, callback){
    makeRequest('candIndustry', {
      "cid": cid,
      "cycle": "2012"
    }, 'industries', callback);
  };

  this.candIndByInd = function(cid, indcode, callback){
    makeRequest('candIndByInd', {
      "cid": cid,
      "cycle": "2012",
      "ind": indcode
    }, 'candIndus', callback);
  };

  this.candSector = function(cid, callback){
    makeRequest('candSector', {
      "cid": cid,
      "cycle": "2012"
    }, 'sectors', callback);
  };

  this.congCmteIndus = function(cmte, congno, indus, callback){
    makeRequest('congCmteIndus', {
      "cmte": cmte,
      "congno": congno,
      "indus": indus
    }, 'committee', callback);
  };
}

module.exports = OpenSecretsClient;

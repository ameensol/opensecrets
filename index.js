var request = require('request');
var querystring = require('querystring');

var OpenSecrets = module.exports = function (apiKey){
  if(!this instanceof OpenSecrets) { return new OpenSecrets(apiKey) }

  if (!apiKey) { throw new Error('Must provide apiKey') }

  this.apiKey = apiKey

}

OpenSecrets.prototype.candSummary = function (cid, callback){
  return this.makeRequest('candSummary', {
    "cid": cid
  }, 'summary', callback);
};

OpenSecrets.prototype.candContrib = function (cid, callback){
  return this.makeRequest('candContrib', {
    "cid": cid
  }, 'contributors', callback);
};

OpenSecrets.prototype.candIndustry = function (cid, callback){
  return this.makeRequest('candIndustry', {
    "cid": cid,
    "cycle": "2012"
  }, 'industries', callback);
};

OpenSecrets.prototype.candIndByInd = function (cid, indcode, callback){
  return this.makeRequest('candIndByInd', {
    "cid": cid,
    "cycle": "2012",
    "ind": indcode
  }, 'candIndus', callback);
};

OpenSecrets.prototype.candSector = function (cid, callback){
  return this.makeRequest('candSector', {
    "cid": cid,
    "cycle": "2012"
  }, 'sectors', callback);
};

OpenSecrets.prototype.congCmteIndus = function (cmte, congno, indus, callback){
  return this.makeRequest('congCmteIndus', {
    "cmte": cmte,
    "congno": congno,
    "indus": indus
  }, 'committee', callback);
};

OpenSecrets.prototype.makeRequest = function (func, args, dataTarget, callback){

  var options = createOptions(func, args, this.apiKey);

  return executeRequest(options, dataTarget, callback);
}

function createOptions(func, args, apiKey){
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
//
// TODO: Allow for streaming of response.
//
function executeRequest(options, dataTarget, callback){
  request(options, function (err, res, body) {
    if (res && res.statusCode == 200) {
      callback(null, JSON.parse(body)['response'][dataTarget]);
    } else {
      callback(new Error("Request failed with " + res.statusCode))
    }
  });
}



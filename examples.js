var OpenSecretsClient = require('./main.js');

// Load apiKey from config.json - you can replace this code and manually set your API key here
var nconf = require('nconf');
nconf.use('file', { file: './config.json' });
nconf.load();
var apiKey = nconf.get('apiKey');

var client = new OpenSecretsClient(apiKey);

client.candSummary('N00007360', function(err, json) {
  if (err) throw err;
  console.log('-----------------Candidate Summary---------------');
  console.log(json['@attributes']);
});

client.candContrib('N00007360', function(err, json) {
  if (err) throw err;
  console.log('--------------Candidate Contributions------------');
  console.log(json['']);
});

client.candIndustry('N00007360', function(err, json) {
  if (err) throw err;
  console.log('-----------------Candidate Industry--------------');
  console.log(json);
});

client.candIndByInd('N00007360', 'K02', function(err, json) {
  if (err) throw err;
  console.log('----------Candidate Industry By Industry---------');
  console.log(json);
});

client.candSector('N00007360', function(err, json) {
  if (err) throw err;
  console.log('-----------------Candidate Sector----------------');
  console.log(json);
});

client.congCmteIndus('HARM', '112', 'F10', function(err, json) {
  if (err) throw err;
  console.log('--------------Congressional Committees-----------');
  console.log(json);
});
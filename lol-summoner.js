var open = require('open');
var prompt = require('prompt');

prompt.start();

getChampionName(openChampPages);

function getChampionName(callback) {
  prompt.message = 'Champion Name';
  prompt.get(['champion'], function(err, result) {
    if (err) { return onErr(err); }
    if (result.champion === '') { return; }
    
    callback(toUpperFirstChar(result.champion));
  });
}

function openChampPages(championName) {
  var sitesToSearch = ['http://champion.gg/champion/', 
                       'http://probuilds.net/champions/details/',
                       'http://www.championselect.net/champions/'];

  for(site in sitesToSearch) {
    console.log(sitesToSearch[site] + championName);
    open(sitesToSearch[site] + championName);
  }
}

function toUpperFirstChar(str) {
  var lcStr = str.toLowerCase();
  return lcStr.charAt(0).toUpperCase() + lcStr.slice(1);
}
// Import Modules
var open = require('open');
var prompt = require('prompt');
var champInfo = require('./champion-info.json').data; // from https://global.api.pvp.net/api/lol/static-data/na/v1.2/champion?champData=info&api_key=
prompt.start();


// Give things a kick
getChampionName(openChampPages);



// Ask the user for champion they want info about
// Eventually used to open some links assuming that they want to play the champion
function getChampionName(callback) {
  prompt.message = 'Champion Name';
  prompt.get(['champion'], function(err, result) {
    if (err) { return onErr(err); }

    var championName = fixChampNameCaps(result.champion);
    if(validateChampName(championName)) {
      callback(championName);
    }
    else {
      console.log('Lol.. "'+ championName + '" isn\'t a champion name :P\nTry again sneeber ;)\n')
      getChampionName(callback);
    }
  });
}

// Ask the user for laning opponent
function getOpponentName(callback) {
  prompt.message = 'Opponent Name';
  prompt.get(['champion'], function(err, result) {
    if (err) { return onErr(err); }
    if (result.champion === '') { return; }
    
    callback(fixChampNameCaps(result.champion));
  });
}

// Open useful websites given a champion name
function openChampPages(championName) {
  var sitesToSearch = ['http://champion.gg/champion/', 
                       'http://probuilds.net/champions/details/',
                       'http://www.championselect.net/champions/'];

  for(site in sitesToSearch) {
    console.log(sitesToSearch[site] + championName);
    open(sitesToSearch[site] + championName);
  }
}

// Take champion name and make sure it has the first letter capitalized 
// followed by all lower case letters
function fixChampNameCaps(name) {
  var lcStr = name.toLowerCase();
  return lcStr.charAt(0).toUpperCase() + lcStr.slice(1);
}

// Make sure champ name is valid by checking against list of all champions
function validateChampName(championName) {
  return champInfo.hasOwnProperty(championName);
}
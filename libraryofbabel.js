// * FROM: https://github.com/cakenggt/Library-Of-Pybel/blob/gh-pages/libraryofbabel.js

var length_of_page = 2000;
var length_of_title = 25;

var seed = 6;

// in order to work 'seed' must NOT be undefined,
// so in any case, you HAVE to provide a seed

function seededRandom(min, max) {
  max = max || 1;
  min = min || 0;

  seed = (seed * 9301 + 49297) % 233280;
  var rnd = seed / 233280;

  return min + rnd * (max - min);
}

function hashCode(s) {
  var hash = 0, i, chr, len;
  if (s.length == 0) return hash;
  for (i = 0, len = s.length; i < len; i++) {
    chr = s.charCodeAt(i);
    hash = ((hash << 5) - hash) + chr;
    hash |= 0; // Convert to 32bit integer
  }
  return hash;
};

function pad(s, size) {
  while (s.length < size) s = "0" + s;
  return s;
}

Number.prototype.mod = function (n) {
  return ((this % n) + n) % n;
};

const an = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
//digs must be the same length as an
const digs = 'abcdefghijklmnopqrstuvwxyz, .aeiouy ';

export function search(search_str) {
  //randomly generate location numbers
  var wall = '' + parseInt(Math.random() * 3 + 1)
  var shelf = '' + parseInt(Math.random() * 4 + 1)
  var volume = pad('' + parseInt(Math.random() * 31 + 1), 2)
  var page = pad('' + parseInt(Math.random() * 409 + 1), 3)
  var locHash = hashCode((wall + shelf + volume + page));
  var hex = '';
  var depth = parseInt(Math.random() * (length_of_page - search_str.length));
  for (var x = 0; x < depth; x++) {
    search_str = digs[parseInt(Math.random() * digs.length)] + search_str;
  }
  //hash of loc will be used to create a seeded RNG
  seed = Math.abs(locHash);
  for (var i = 0; i < search_str.length; i++) {
    var index = digs.indexOf(search_str[i]);
    //for each calculated value of the rng, it will be added to the index value and modded to len of an
    var rand = seededRandom(0, digs.length);
    var newIndex = (index + parseInt(rand)).mod(an.length);
    var newChar = an[newIndex];
    //hex will be built from the indexes translated into an
    hex += newChar;
  }
  var return_str = hex + ':' + wall + ':' + shelf + ':' + parseInt(volume) + ':' + parseInt(page);
  
  if(return_str.length > 2000){
    return_str = return_str.substring(0, 2000);
  }

  return return_str;
}

export function getPage(address) {
  //for each char of hex, it will be turned into the index value in the an string
  var addressArray = address.split(':');
  var hex = addressArray[0];
  var locHash = hashCode(addressArray[1] + addressArray[2] +
    pad(addressArray[3], 2) + pad(addressArray[4], 3));
  //hash of loc will be used to create a seeded RNG
  seed = Math.abs(locHash);
  var result = '';
  for (var i = 0; i < hex.length; i++) {
    var index = an.indexOf(hex[i]);
    //for each calculated value of the rng, it will be subtracted from the index value and modded to len of digs
    var rand = seededRandom(0, an.length);
    var newIndex = (index - parseInt(rand)).mod(digs.length);
    var newChar = digs[newIndex];
    //document will be built from the indexes translated into digs
    result += newChar;
  }
  //any leftover space will be filled with random numbers seeded by the hash of the result so far
  seed = Math.abs(hashCode(result));
  while (result.length < length_of_page) {
    index = parseInt(seededRandom(0, digs.length));
    result += digs[index];
  }
  return result.substr(result.length - length_of_page);
}

export function getTitle(address) {
  var addressArray = address.split(':');
  var hex = addressArray[0];
  var locHash = hashCode(addressArray[1] + addressArray[2] +
    pad(addressArray[3], 2) + 4);
  seed = Math.abs(locHash);
  var result = '';
  for (var i = 0; i < hex.length; i++) {
    var index = an.indexOf(hex[i]);
    var rand = seededRandom(0, an.length);
    var newIndex = (index - parseInt(rand)).mod(digs.length);
    var newChar = digs[newIndex];
    result += newChar;
  }
  seed = Math.abs(hashCode(result));
  while (result.length < length_of_title) {
    index = parseInt(seededRandom(0, digs.length));
    result += digs[index];
  }
  return result.substr(result.length - length_of_title);
}

export function searchTitle(search_str) {
  //randomly generate location numbers
  var wall = '' + parseInt(Math.random() * 3 + 1)
  var shelf = '' + parseInt(Math.random() * 4 + 1)
  var volume = pad('' + parseInt(Math.random() * 31 + 1), 2)
  var locHash = hashCode(wall + shelf + volume + 4);
  var hex = '';
  search_str = search_str.substr(0, length_of_title);
  while (search_str.length < length_of_title) {
    search_str += ' ';
  }
  //hash of loc will be used to create a seeded RNG
  seed = Math.abs(locHash);
  for (var i = 0; i < search_str.length; i++) {
    var index = digs.indexOf(search_str[i]);
    //for each calculated value of the rng, it will be added to the index value and modded to len of an
    var rand = seededRandom(0, digs.length);
    var newIndex = (index + parseInt(rand)).mod(an.length);
    var newChar = an[newIndex];
    //hex will be built from the indexes translated into an
    hex += newChar;
  }
  return hex + ':' + wall + ':' + shelf + ':' + parseInt(volume)
}
var moment = require('moment');


function Ephemeral(date) {
  this._date = date;
}

function prepositionToUseForDateFormat(dateFormat) {
  if (typeof dateFormat !== 'string') {
    throw new Error('Cannot pass non-String to prepositionToUseForDateFormat');
  }

  var dayRegexp = /d/ig;
  var prepositionToUse;

  if (dateFormat.match(dayRegexp)) {
    prepositionToUse = 'on';

    var dayOrdinalRegexp = /D+o$/g;

    if (dateFormat.match(dayOrdinalRegexp)) {
      prepositionToUse = prepositionToUse.concat(' the');
    }
  } else {
    prepositionToUse = 'in';
  }

  return prepositionToUse;
}


function formattedDate(date, format) {
  var formatted = moment(date).format(format);
  return formatted;
}


function formattedDateWithPreposition(date, format) {
  var dateWithPreposition = prepositionToUseForDateFormat(format).concat(' ', formattedDate(date, format));
  return dateWithPreposition;
}


var formats = {
  date: 'MMMM DDDo, YYYY',
  day: 'dddd',
  year: 'YYYY',
  month: 'MMMM',
  dayOrdinal: 'DDDo'
};


function addFormatMethodToEphemeral(key) {
  Ephemeral.prototype[key] = function() {
    return formattedDateWithPreposition(this._date, formats[key]);
  };
}


for (var key in formats) {
  addFormatMethodToEphemeral(key);
}


Ephemeral.prototype.formattedDateWithPreposition = function(format) {
  return formattedDateWithPreposition(this._date, format);
};


module.exports = (function EphemeralCreator(date) {
  return new Ephemeral(date);
});

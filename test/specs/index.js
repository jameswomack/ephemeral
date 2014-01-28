var spec = require('brofist')();
var chai = require('chai');
var expect = chai.expect;

var _ = require('../../')(new Date('Jan 27, 2014'));

module.exports = spec('λ format', function(it) {
  it('Should replace date occurrences in the mapping by a formatted date with the correct preposition.', function() {
    expect(_.formattedDateWithPreposition('YYYY')).to.equal('in 2014');
    expect(_.formattedDateWithPreposition('MMMM DDDo, YYYY')).to.equal('on January 27th, 2014');
  });
});

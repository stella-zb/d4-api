const { fetchBreedDescription } = require('../breedFetcher');
const { assert } = require('chai');

describe('fetchBreedDescription', () => {
  it('returns a string description for a valid breed, via callback', (done) => {
    fetchBreedDescription('Siberian', (desc, err) => {
      const expectedDesc = "The Siberians dog like temperament and affection makes the ideal lap cat and will live quite happily indoors. Very agile and powerful, the Siberian cat can easily leap and reach high places, including the tops of refrigerators and even doors. ";
      assert.equal(expectedDesc, desc);
      assert.equal(null, err);
      done();
    });
  });

  it('returns a error message for a unvalid breed', (done) => {
    fetchBreedDescription('Panda', (desc, err) => {
      assert.equal(null, desc);
      assert.equal('Not found', err);
      done();
    });
  });
});
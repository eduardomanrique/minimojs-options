const expect = require('chai').expect;
require('chai').should();
const assert = require('assert');
const optional = require('./index');

describe('Optional', () => {
    it('First option', () => optional.firstOption([1,2,3]).ifPresent(i => expect(i).to.eq(1)));
    it('First empty option', () => optional.firstOption([]).ifPresent(i => assert(false)));
});
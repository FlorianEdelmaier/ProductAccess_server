'use strict';
const expect = require('expect');
const expectExpress = require('expect-express');
expect.extend(expectExpress);
const db = require('./../../routes/db.js');

describe('getAllProducts', () => {
    it('should return a promise', () => {
        expect(db.getAllProducts()).toBeA(Promise);
    })
    it('should return array of products', () => {
        try {
            const products = db.getAllProducts();
            //expect(products).toBeAn(Array);
            //done();
        }
        catch(err) { throw(err); }
    })
})
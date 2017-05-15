'use strict';
const expect = require('expect');
const productRepo = require('./../../repositories/product');

describe('Product Model', () => {
    describe('findAll', () => {
        it('should return a Promise', () => {
            expect(productRepo.findAll()).toBeA(Promise);
        })
    })
});
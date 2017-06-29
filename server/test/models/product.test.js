'use strict';
const expect = require('expect');
const Product = require('./../../models/product');

describe('Product Model', () => {
    it('should have id as primary key', () => {
        expect(Product.Instance.prototype.rawAttributes.hasOwnProperty("id")).toBeTruthy();
        expect(Product.Instance.prototype.rawAttributes.id.primaryKey).toEqual(true);
    })
    it('should have mandaotry name attribute', () => {
        expect(Product.Instance.prototype.rawAttributes.hasOwnProperty("name")).toBeTruthy();
        expect(Product.Instance.prototype.rawAttributes.name.allowNull).toEqual(false);
    })
    it('should have description attribute', () => {
        expect(Product.Instance.prototype.rawAttributes.hasOwnProperty("description")).toBeTruthy();
    })
    it('should have link attribute', () => {
        expect(Product.Instance.prototype.rawAttributes.hasOwnProperty("link")).toBeTruthy();
    })
    it('should have a status enum attribute with default value "up"', () => {
        expect(Product.Instance.prototype.rawAttributes.hasOwnProperty("status")).toBeTruthy();
        expect(Product.Instance.prototype.rawAttributes.status.values).toEqual(['up', 'maintenance', 'off']);
        expect(Product.Instance.prototype.rawAttributes.status.defaultValue).toEqual('up');
    })

});
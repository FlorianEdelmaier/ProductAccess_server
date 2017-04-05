'use strict';
const db = require('./db.json');

class DbFakeServer {
    constructor() {
        this.data = db.products;
    }

    getAllProducts() {
        return this.data.map(v => {
            return {
                id: v.id,
                name: v.name,
                description: v.description,
                link: v.link
            }
        });
    }

    getReleasesForProduct(productId) {
        for(let i=0; i < this.data.length; i++) {
            if(this.data[i].id === productId) {
                return db.products[i].releases;
            }
        }
        return [];
    }

    addReleaseToProduct(productId, release) {
        for(let i=0; i < this.data.length; i++) {
            if(this.data[i].id === productId) {
                this.data[i].releases.push(release);
                return release;
            }
        }
        throw new Error("no product found with id" + productId);
    }
}

module.exports = new DbFakeServer();
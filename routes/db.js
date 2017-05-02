'use strict';
const fs = require('fs');
const db = require('./db.json');

class DbFileServer {
    constructor() {
        //this.data = db.products;
    }

    getAllProducts() {
        return new Promise((resolve, reject) => {
            fs.readFile('./db.json', (err, buf) => {
                if(err) reject(err);
                try {
                    const data = JSON.parse(buf.toString());
                    return data.products.map(v => {
                        return {
                            id: v.id,
                            name: v.name,
                            description: v.description,
                            link: v.link
                        }
                })
            }
            catch(e) { reject(e) }
            })
        })
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

module.exports = new DbFileServer();
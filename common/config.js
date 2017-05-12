'use strict';
const yaml = require('js-yaml');
const fs = require('fs');

module.exports.load = (path) => {
    return yaml.safeLoad(fs.readFileSync(path, 'utf-8'));
}
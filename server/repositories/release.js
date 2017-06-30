'use strict';
const db = require('./../data/db.js');

exports.findByProduct = async (productId) => {
    const releases = await db.all(`SELECT id, date(releaseDate), version, notes FROM Release WHERE productId = ${productId} ORDER BY date(releaseDate)`);
    return releases.map(r => { r.notes = r.notes.split('|'); return r; });
}

exports.findById = async (id) => {
    const release = await db.get(`SELECT id, date(releaseDate), version, notes FROM Release WHERE id = ${id}`);
    release.notes = release.notes.split('|');
    return release;
}

exports.create = (productId, releaseDate, version, notes) => {
    let notesArray = [].concat(notes);
    console.log("notes",notesArray, typeof notesArray)
    return db.run(`INSERT INTO Release (productId, releaseDate, version, notes) VALUES (${productId}, '${releaseDate}', '${version}', '${notesArray.join('|')}')`)
}

exports.delete = (id) => {
    return db.run(`DELETE FROM Release WHERE id = ${id}`)
}
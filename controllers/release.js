'use strict';
const releaseRepo = require('./../repositories/release');
const Validator = require('combine-validators');
const validations = Validator.validations;

exports.getAllReleasesForProduct = async (req, res, next) => {
    const v = new Validator();
    v.check(validations.isMandatory, validations.isNumeric)(req.params, 'productId', 'id is mandatory');
    if(v.hasErrors()) {
        res.status(400).json({ errors: v.errors });
    }
    else {
        try {
            const releases = await releaseRepo.findByProduct(req.params.productId);
            res.json(releases);
        } catch(err) { next(err); }
    }
}

exports.createRelease = async (req, res, next) => {
    const v = new Validator();
    v.check(validations.isMandatory, validations.isNumeric)(req.body, 'productId', 'ProductID not valid');
    v.check(validations.isOptional)(req.body, 'releaseDate', 'ReleaseDate is optional');
    v.check(validations.isMandatory)(req.body, 'version', 'Version was not provided');
    v.check(validations.notes)(req.body, 'notes', 'notes are optional');
    if(v.hasErrors()) { 
        res.status(400).json({ errors: v.errors });
    }
    else {
        try
        {
            const returnValue = await releaseRepo.create(req.body.productId, req.body.releaseDate, req.body.version, req.body.notes);
            const release = await releaseRepo.findById(returnValue.lastID);
            res.status(200).json(release);
        }
        catch(err) { next(err); }
    }
}

exports.delete = async (req, res, next) => {
    const v = new Validator();
    v.check(validations.isMandatory, validations.isNumeric)(req.params, 'id', 'id is mandatory');
    if(v.hasErrors()) {
        res.status(400).json({ errors: v.errors });
    }
    else {
        try {
            const releases = await releaseRepo.delete(req.params.id);
            res.json({success: true});
        } catch(err) { next(err); }
    }
}
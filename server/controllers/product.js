'use strict';
const productRepo = require('./../repositories/product');
const Validator = require('combine-validators');
const validations = Validator.validations;

exports.getAllProducts = async (req, res, next) => {
    try {
        const products = await productRepo.findAll();
        res.json(products);
    } catch(err) { next(err); }
}

exports.getProductsByType = async (req, res, next) => {
    const v = new Validator();
    v.check(validations.isMandatory)(req.params, 'type', 'type is mandatory');
    if(v.hasErrors()) {
        res.status(400).json({ errors: v.errors });
    }
    else {
        try {
            const products = await productRepo.findByType(req.params.type);
            res.json(products);
        } catch(err) { next(err); }
    }
}

exports.getAllProductStates = (req, res, next) => {
    res.json(productRepo.validProductStates);
}

exports.getAllProductTypes = (req, res, next) => {
    res.json(productRepo.validProductTypes);
}

exports.createProduct = async (req, res, next) => {
    const v = new Validator();
    v.check(validations.isMandatory)(req.body, 'name', 'name is mandatory');
    v.check(validations.isOptional)(req.body, 'description', 'description throws error');
    v.check(validations.isOptional, validations.isURL)(req.body, 'link', 'link has to be a valid URL');
    v.check(validations.isOptional, validations.isURL)(req.body, 'linkUserManual', 'linkUserManual has to be a valid URL');
    v.check(validations.isOptional, validations.isURL)(req.body, 'linkSupportSite', 'linkSupportSite has to be a valid URL');
    v.check(validations.isOptional, validations.isURL)(req.body, 'linkMarketingDoc', 'linkMarketingDoc has to be a valid URL');
    v.check(validations.isOptional, validations.isIn(productRepo.validProductStates))(req.body, 'status', 'status needs to be valid');
    v.check(validations.isMandatory, validations.isIn(productRepo.validProductTypes))(req.body, 'type', 'type needs to be valid');
    if(v.hasErrors()) {
        res.status(400).json({ errors: v.errors });
    }
    else {
        try {
            const returnValue = await productRepo.add(req.body.name, req.body.description, req.body.link, req.body.linkUserManual, req.body.linkSupportSite, req.body.linkMarketingDoc, req.body.status, req.body.type);
            const product = await productRepo.findById(returnValue.lastID);
            res.json(product);
        } catch(err) { next(err); }
    }
}

exports.updateProduct = async (req, res, next) => {
    const v = new Validator();
    v.check(validations.isMandatory)(req.body, 'id', 'id is mandatory');
    v.check(validations.isMandatory)(req.body, 'name', 'name is mandatory');
    v.check(validations.isOptional)(req.body, 'description', 'description throws error');
    v.check(validations.isOptional, validations.isURL)(req.body, 'link', 'link has to be a valid URL');
    v.check(validations.isOptional, validations.isURL)(req.body, 'linkUserManual', 'linkUserManual has to be a valid URL');
    v.check(validations.isOptional, validations.isURL)(req.body, 'linkSupportSite', 'linkSupportSite has to be a valid URL');
    v.check(validations.isOptional, validations.isURL)(req.body, 'linkMarketingDoc', 'linkMarketingDoc has to be a valid URL');
    v.check(validations.isOptional, validations.isIn(productRepo.validProductStates))(req.body, 'status', 'status needs to be valid');
    v.check(validations.isMandatory, validations.isIn(productRepo.validProductTypes))(req.body, 'type', 'type needs to be valid');
    if(v.hasErrors()) {
        res.status(400).json({ errors: v.errors });
    }
    else {
        try {
            const returnValue = await productRepo.update(req.body.id, req.body.name, req.body.description, req.body.link, req.body.linkUserManual, req.body.linkSupportSite, req.body.linkMarketingDoc, req.body.status, req.body.type);
            const product = await productRepo.findById(req.body.id);
            res.json(product);
        } catch(err) { next(err); }
    }
}

exports.setProductState = async (req, res, next) => {
    const v = new Validator();
    v.check(validations.isMandatory)(req.body, 'id', 'id is mandatory');
    v.check(validations.isMandatory, validations.isIn(productRepo.validProductStates))(req.body, 'status', 'status needs to be valid');
    if(v.hasErrors()) {
        res.status(400).json({ errors: v.errors });
    }
    else {
        try {
            const returnValue = await productRepo.setState(req.body.id, req.body.status);
            const product = await productRepo.findById(req.body.id);
            res.json(product);
        } catch(err) { next(err); }
    }
}

exports.deleteProduct = async (req, res, next) => {
    const v = new Validator();
    v.check(validations.isMandatory)(req.body, 'id', 'id is mandatory');
    if(v.hasErrors()) {
        res.status(400).json({ errors: v.errors });
    }
    else {
        try {
            const product = await productRepo.findById(req.body.id);
            const returnValue = await productRepo.delete(req.body.id);
            res.json(product);
        } catch(err) { next(err); }
    }
}

exports.getOverview = async (req, res, next) => {
    try {
        const tiles = await productRepo.getProductOverview();
        console.log("tiles", tiles);
        res.json(tiles);
    } catch(err) { next(err); }
}
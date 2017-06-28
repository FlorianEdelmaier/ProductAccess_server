'use strict';
const Validator = require('combine-validators');
const validations = Validator.validations;

exports.login = async (req, res, next) => {
    const v = new Validator();
    v.check(validations.isMandatory)(req.body, 'email', 'email is mandatory');
    v.check(validations.isMandatory)(req.body, 'pwd', 'pwd is mandatory');
    if(v.hasErrors()) {
        res.status(400).json({ errors: v.errors });
    }
    else {
        try {
            const resp = (req.body.pwd === "imst" && req.body.email === "florian.edelmaier@sos-kd.org").toString();
            res.json({success: resp});
        } catch(err) { next(err); }
    }
}
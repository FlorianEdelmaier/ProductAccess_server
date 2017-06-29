'use strict';
const Validator = require('combine-validators');
const validations = Validator.validations;

const validEmails = [
    'florian.edelmaier@sos-kd.org',
    'martin.burko@sos-kd.org',
    'benjamin.cremer@sos-kd.org',
    'thomas.kofler@sos-kd.org',
    'oliver.vavtar@sos-kd.org',
]

exports.login = async (req, res, next) => {
    const v = new Validator();
    v.check(validations.isMandatory)(req.body, 'email', 'email is mandatory');
    v.check(validations.isMandatory)(req.body, 'pwd', 'pwd is mandatory');
    if(v.hasErrors()) {
        res.status(400).json({ errors: v.errors });
    }
    else {
        try {
            const resp = (req.body.pwd === "Imst1949!" && validEmails.includes(req.body.email)).toString();
            res.json({success: resp});
        } catch(err) { next(err); }
    }
}
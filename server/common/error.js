'use strict';

module.exports = (err, req, res) => {
    let errorResp = { message: '', error: {} };
    errorResp.message = err.message || 'Internal server error';
    if (process.env.NODE_ENV !== 'production') {
        errorResp.error.message = err.message;
        errorResp.error.stack = err.stack;
        errorResp.error.status = err.status || 500;
    }
    res.status(err.status || 500).json(errorResp);
};
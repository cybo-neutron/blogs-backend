"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function ErrorMiddleware(error, req, res, _next) {
    var status = error.status || 500;
    var message = error.message || "Something went wrong";
    res.status(status).json({
        status: status,
        message: message
    });
}
exports.default = ErrorMiddleware;

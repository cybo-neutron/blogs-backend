"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function ErrorMiddleware(error, req, res, _next) {
    const status = error.status || 500;
    const message = error.message || "Something went wrong";
    res.status(status).json({
        status,
        message
    });
}
exports.default = ErrorMiddleware;

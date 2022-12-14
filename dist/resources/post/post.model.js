"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var PostSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: true
    },
    tags: Array(),
    image: {
        type: String,
    },
    description: {
        type: String,
        // required : true,
    },
    date: {
        type: Date,
        default: function () { return Date.now(); },
    },
    isPublic: {
        type: Boolean,
        default: false,
    },
    user_id: {
        type: String,
    }
});
exports.default = (0, mongoose_1.model)('post', PostSchema);

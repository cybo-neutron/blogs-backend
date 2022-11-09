"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var joi_1 = __importDefault(require("joi"));
var create = joi_1.default.object({
    title: joi_1.default.string().required(),
    tags: joi_1.default.array(),
    description: joi_1.default.string().required(),
    date: joi_1.default.date().default(Date.now),
    isPublic: joi_1.default.boolean().default(false),
    user_id: joi_1.default.string(),
    image: joi_1.default.string().optional().allow('')
});
exports.default = { create: create };

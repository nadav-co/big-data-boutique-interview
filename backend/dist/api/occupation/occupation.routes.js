"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var getOccupations = require('./occupation.controller').getOccupations;
var router = express_1.default.Router();
router.get('/:year', getOccupations);
module.exports = router;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var _a = require('./manager.controller'), getManager = _a.getManager, updateManager = _a.updateManager, saveManager = _a.saveManager, getManagers = _a.getManagers;
var router = express_1.default.Router();
router.get('/:id', getManager);
router.get('/', getManagers);
router.put('/:id', updateManager);
router.post('/', saveManager);
module.exports = router;

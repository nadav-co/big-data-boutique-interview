"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var _a = require('./meeting.controller'), getMeetings = _a.getMeetings, getMeeting = _a.getMeeting, updateMeeting = _a.updateMeeting, saveMeeting = _a.saveMeeting;
var router = express_1.default.Router();
router.get('/:month/:day/:year', getMeetings);
router.get('/:id', getMeeting);
router.put('/:id', updateMeeting);
router.post('/', saveMeeting);
module.exports = router;

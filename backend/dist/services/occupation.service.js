"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.occupationService = void 0;
var dbService = require('./db.service');
var ObjectId = require('mongodb').ObjectId;
exports.occupationService = {
    save: save
};
function save(meetingToAdd) {
    return __awaiter(this, void 0, void 0, function () {
        var meeting, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    meeting = __assign(__assign({}, meetingToAdd), { startDate: new Date(meetingToAdd.startDate), endDate: new Date(meetingToAdd.endDate) });
                    if (!meeting._id) return [3 /*break*/, 2];
                    return [4 /*yield*/, _update(meeting)];
                case 1:
                    _a = _b.sent();
                    return [3 /*break*/, 4];
                case 2: return [4 /*yield*/, _add(meeting)];
                case 3:
                    _a = _b.sent();
                    _b.label = 4;
                case 4: return [2 /*return*/, _a];
            }
        });
    });
}
function _add(meeting) {
    return __awaiter(this, void 0, void 0, function () {
        var collection, occupationsByDate, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, dbService.getCollection('occupation')];
                case 1:
                    collection = _a.sent();
                    return [4 /*yield*/, collection.findOne({ "year": meeting.startDate.getFullYear() })];
                case 2:
                    occupationsByDate = (_a.sent()) || { year: meeting.startDate.getFullYear() };
                    return [2 /*return*/, CheckTimeAndSave(meeting, occupationsByDate, collection)];
                case 3:
                    err_1 = _a.sent();
                    console.log(err_1);
                    throw err_1;
                case 4: return [2 /*return*/];
            }
        });
    });
}
function _update(meeting) {
    return __awaiter(this, void 0, void 0, function () {
        var collection, oldOccupationsByDate, occupationsByDate, err_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, dbService.getCollection('occupation')];
                case 1:
                    collection = _a.sent();
                    return [4 /*yield*/, collection.findOne({ "year": meeting.startDate.getFullYear() })];
                case 2:
                    oldOccupationsByDate = _a.sent();
                    occupationsByDate = _removeOccupiedHours(meeting, oldOccupationsByDate);
                    return [2 /*return*/, CheckTimeAndSave(meeting, occupationsByDate, collection)];
                case 3:
                    err_2 = _a.sent();
                    console.log(err_2);
                    throw err_2;
                case 4: return [2 /*return*/];
            }
        });
    });
}
function CheckTimeAndSave(meeting, occupationsByDate, collection) {
    return __awaiter(this, void 0, void 0, function () {
        var newOccupationsByDate, res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!_checkStartHours(meeting.startDate, occupationsByDate) || !_checkEndHours(meeting.endDate, occupationsByDate))
                        throw new Error('invalid time');
                    newOccupationsByDate = _addOccupiedHours(meeting, occupationsByDate);
                    return [4 /*yield*/, collection.updateOne({ "year": meeting.startDate.getFullYear() }, { $set: newOccupationsByDate })];
                case 1:
                    res = _a.sent();
                    if (!res.result.nModified)
                        collection.insertOne(__assign(__assign({}, newOccupationsByDate), { "year": meeting.startDate.getFullYear() }));
                    return [2 /*return*/];
            }
        });
    });
}
function _addOccupiedHours(meeting, occupationsByDate) {
    var _a;
    var start = meeting.startDate;
    var end = meeting.endDate;
    var occHours = new Array(end.getHours() - start.getHours()).fill('').map(function (a, idx) { return start.getHours() + idx; });
    var date = start.getMonth() + "-" + start.getDate();
    var occupations = occupationsByDate[date] ? __spreadArray(__spreadArray([], occupationsByDate[date]), occHours) : __spreadArray([], occHours);
    return __assign(__assign({}, occupationsByDate), (_a = {}, _a[date] = occupations, _a));
}
function _removeOccupiedHours(meeting, occupationsByDate) {
    var _a;
    var start = meeting.startDate;
    var end = meeting.endDate;
    var occHours = new Array(end.getHours() - start.getHours()).fill('').map(function (a, idx) { return start.getHours() + idx; });
    var date = start.getMonth() + "-" + start.getDate();
    var occupations = occupationsByDate[date].filter(function (hour) { return !occHours.includes(hour); });
    return __assign(__assign({}, occupationsByDate), (_a = {}, _a[date] = occupations, _a));
}
var _checkStartHours = function (time, occupationsByDate) {
    var hour = time.getHours();
    return (_isWorkHours(hour)) && _isOccHours(occupationsByDate, time, hour);
};
var _checkEndHours = function (time, occupationsByDate) {
    var hour = time.getHours();
    return (_isWorkHours(hour)) && _isOccHours(occupationsByDate, time, hour, 1);
};
var _isWorkHours = function (hour) {
    return (hour < 9 || hour > 18) ? false : true;
};
var _isOccHours = function (occupationsByDate, time, hour, diff) {
    var _a;
    if (diff === void 0) { diff = 0; }
    return ((_a = occupationsByDate[time.getMonth() + "-" + time.getDate()]) === null || _a === void 0 ? void 0 : _a.includes(hour - diff)) ? false : true;
};

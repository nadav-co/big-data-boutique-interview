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
Object.defineProperty(exports, "__esModule", { value: true });
exports.meetingService = void 0;
var dbService = require('../../services/db.service');
var ObjectId = require('mongodb').ObjectId;
exports.meetingService = {
    query: query,
    getById: getById,
    update: update,
    save: save,
    getOccupations: getOccupations
};
function query(month, year) {
    return __awaiter(this, void 0, void 0, function () {
        var collection, date, meetings, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, dbService.getCollection('meeting')];
                case 1:
                    collection = _a.sent();
                    date = year + "-" + (+month - 1);
                    return [4 /*yield*/, collection.find({ 'indexDate': date }).toArray()];
                case 2:
                    meetings = _a.sent();
                    return [2 /*return*/, meetings];
                case 3:
                    err_1 = _a.sent();
                    throw err_1;
                case 4: return [2 /*return*/];
            }
        });
    });
}
function getOccupations(month, year) {
    return __awaiter(this, void 0, void 0, function () {
        var meetings, occupationsByDate_1, err_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, query(month, year)];
                case 1:
                    meetings = _a.sent();
                    occupationsByDate_1 = { month: +month - 1 };
                    console.log(meetings);
                    meetings.forEach(function (meeting) {
                        var _a;
                        var start = new Date(meeting.startDate);
                        ((_a = occupationsByDate_1[start.getMonth() + "-" + start.getDate()]) === null || _a === void 0 ? void 0 : _a.push.apply(_a, meeting.occupationHours)) ||
                            (occupationsByDate_1[start.getMonth() + "-" + start.getDate()] = meeting.occupationHours);
                    });
                    console.log(occupationsByDate_1);
                    return [2 /*return*/, occupationsByDate_1];
                case 2:
                    err_2 = _a.sent();
                    throw err_2;
                case 3: return [2 /*return*/];
            }
        });
    });
}
function getById(id) {
    return __awaiter(this, void 0, void 0, function () {
        var collection, meeting, err_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, dbService.getCollection('meeting')];
                case 1:
                    collection = _a.sent();
                    return [4 /*yield*/, collection.findOne({ _id: ObjectId(id) })];
                case 2:
                    meeting = _a.sent();
                    return [2 /*return*/, meeting];
                case 3:
                    err_3 = _a.sent();
                    console.log(err_3);
                    throw err_3;
                case 4: return [2 /*return*/];
            }
        });
    });
}
function save(meetingToSave) {
    return __awaiter(this, void 0, void 0, function () {
        var newMeeting, collection, res, err_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 4, , 5]);
                    return [4 /*yield*/, _checkAndModifyMeeting(__assign({}, meetingToSave))];
                case 1:
                    newMeeting = _a.sent();
                    return [4 /*yield*/, dbService.getCollection('meeting')];
                case 2:
                    collection = _a.sent();
                    return [4 /*yield*/, collection.insertOne(__assign({}, newMeeting))];
                case 3:
                    res = _a.sent();
                    return [2 /*return*/, res.ops[0]];
                case 4:
                    err_4 = _a.sent();
                    throw err_4;
                case 5: return [2 /*return*/];
            }
        });
    });
}
function update(meetingToUpdate) {
    return __awaiter(this, void 0, void 0, function () {
        var newMeeting, collection, res, err_5;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 4, , 5]);
                    return [4 /*yield*/, _checkAndModifyMeeting(__assign({}, meetingToUpdate))];
                case 1:
                    newMeeting = _a.sent();
                    newMeeting._id = ObjectId(newMeeting._id);
                    return [4 /*yield*/, dbService.getCollection('meeting')];
                case 2:
                    collection = _a.sent();
                    return [4 /*yield*/, collection.replaceOne({ "_id": ObjectId(newMeeting._id) }, { $set: newMeeting })];
                case 3:
                    res = _a.sent();
                    console.log(res);
                    return [2 /*return*/, newMeeting];
                case 4:
                    err_5 = _a.sent();
                    throw err_5;
                case 5: return [2 /*return*/];
            }
        });
    });
}
function _checkAndModifyMeeting(meeting) {
    return __awaiter(this, void 0, void 0, function () {
        var start, end, occupationHours, occupationsByDate, oldMeeting, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    start = meeting.startDate = new Date(meeting.startDate);
                    end = meeting.endDate = new Date(meeting.endDate);
                    occupationHours = new Array(end.getHours() - start.getHours()).fill('').map(function (a, idx) { return start.getHours() + idx; });
                    return [4 /*yield*/, getOccupations(start.getMonth().toString(), start.getFullYear().toString())];
                case 1:
                    occupationsByDate = _b.sent();
                    if (!(meeting._id)) return [3 /*break*/, 3];
                    return [4 /*yield*/, getById(meeting._id)];
                case 2:
                    _a = _b.sent();
                    return [3 /*break*/, 4];
                case 3:
                    _a = null;
                    _b.label = 4;
                case 4:
                    oldMeeting = _a;
                    occupationHours.forEach(function (hour) {
                        var _a;
                        if (((_a = occupationsByDate[start.getMonth() + "-" + start.getDate()]) === null || _a === void 0 ? void 0 : _a.includes(hour)) &&
                            !(oldMeeting === null || oldMeeting === void 0 ? void 0 : oldMeeting.occupationHours.includes(hour)))
                            throw new Error('Invalid time');
                        return;
                    });
                    meeting.occupationHours = occupationHours;
                    meeting.indexDate = start.getFullYear() + "-" + start.getMonth();
                    return [2 /*return*/, __assign({}, meeting)];
            }
        });
    });
}

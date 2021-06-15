"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var body_parser_1 = __importDefault(require("body-parser"));
var cors_1 = __importDefault(require("cors"));
var path_1 = __importDefault(require("path"));
var express_session_1 = __importDefault(require("express-session"));
var app = express_1.default();
var http = require('http').createServer(app);
var session = express_session_1.default({
    secret: 'coding is amazing',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
});
app.use(body_parser_1.default.json());
app.use(session);
if (process.env.NODE_ENV === 'production') {
    app.use(express_1.default.static(path_1.default.resolve(__dirname, 'public')));
}
else {
    var corsOptions = {
        origin: ['http://127.0.0.1:8080', 'http://localhost:8080', 'http://127.0.0.1:3000', 'http://localhost:3000'],
        credentials: true
    };
    app.use(cors_1.default(corsOptions));
}
var meetingRoutes = require('./api/meeting/meeting.routes');
var occupationRoutes = require('./api/occupation/occupation.routes');
var manager = require('./api/manager/manager.routes');
app.use('/api/meeting', meetingRoutes);
app.use('/api/occupation', occupationRoutes);
app.use('/api/manager', manager);
app.get('*', function (req, res) {
    res.sendFile(path_1.default.join(__dirname, 'public', 'index.html'));
});
var port = process.env.PORT || 3030;
http.listen(port, function () {
    console.log('Server is running on port: ' + port);
});

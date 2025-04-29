"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const sqlite_1 = __importDefault(require("sqlite"));
const cors_1 = __importDefault(require("cors"));
const sqlite3_1 = __importDefault(require("sqlite3"));
console.log("startar express");
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
let database;
(() => __awaiter(void 0, void 0, void 0, function* () {
    const database = yield sqlite_1.default.open({
        driver: sqlite3_1.default.Database,
        filename: 'database.sqlite'
    });
    yield database.run('PRAGMA foreign_keys = ON');
    app.get("/", (request, response) => __awaiter(void 0, void 0, void 0, function* () {
        const userGreeting = yield database.all("SELECT * FROM greetings");
        console.log(userGreeting);
        response.send(userGreeting);
    }));
}))();
app.listen(8080, () => {
    console.log("Redo på http://localhost:8080/");
});

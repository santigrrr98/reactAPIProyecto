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
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = void 0;
const express_1 = require("express");
const database_1 = require("../database/database");
const users_1 = require("../model/users");
class Routes {
    constructor() {
        this.getUsers = (req, res) => __awaiter(this, void 0, void 0, function* () {
            yield database_1.db.conectarBD()
                .then(() => __awaiter(this, void 0, void 0, function* () {
                const query = yield users_1.Credentials.find({});
                res.json(query);
                console.log(query);
            }))
                .catch((mensaje) => {
                res.send(mensaje);
            });
            yield database_1.db.desconectarBD();
        });
        this.logUser = (req, res) => __awaiter(this, void 0, void 0, function* () {
            yield database_1.db.conectarBD();
            console.log(req.body.username);
            let data = yield users_1.Credentials.findOne({
                username: req.body.username,
                password: req.body.password
            });
            res.send(data);
            // .then(async () => {
            //     const j = await Credentials.find({})
            //     console.log(j)
            // })
            // .catch((mensaje) => {
            //     res.send(mensaje)
            // })
            yield database_1.db.desconectarBD();
        });
        this._router = (0, express_1.Router)();
    }
    get router() {
        return this._router;
    }
    misRutas() {
        //USUARIOS
        this._router.get('/user', this.getUsers);
        this._router.post('/credentials', this.logUser);
    }
}
const obj = new Routes();
obj.misRutas();
exports.routes = obj.router;

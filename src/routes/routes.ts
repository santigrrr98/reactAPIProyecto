import { Request, Response, Router } from 'express'
import { db } from '../database/database'
import { Credentials } from '../model/users'


class Routes {
    private _router: Router

    constructor() {
        this._router = Router()
    }
    get router() {
        return this._router
    }

    private getUsers = async (req: Request, res: Response) => {
        await db.conectarBD()
            .then(async () => {
                const query = await Credentials.find({ })
                res.json(query)
                console.log(query)
            })
            .catch((mensaje) => {
                res.send(mensaje)
            })
        await db.desconectarBD()
    }

    private logUser = async (req: Request, res: Response) => {
        await db.conectarBD()
        console.log(req.body.username)
            let data = await Credentials.findOne({
                username: req.body.username,
                password: req.body.password
            })

            res.send(data)
        // .then(async () => {
        //     const j = await Credentials.find({})
        //     console.log(j)
        // })
        // .catch((mensaje) => {
        //     res.send(mensaje)
        // })
        await db.desconectarBD()
    }

    misRutas() {
        //USUARIOS
        this._router.get('/user', this.getUsers)
        this._router.post('/credentials', this.logUser)

    }

}

const obj = new Routes()
obj.misRutas()
export const routes = obj.router


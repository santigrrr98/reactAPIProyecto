import mongoose from 'mongoose';

class DataBase {

    private _cadenaConexion: string = 'mongodb+srv://hola:hola1@cluster0.tjvom.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
    //private _cadenaConexion2:string= `mongodb+srv://***:****@cluster0.sentg.mongodb.net/test?retryWrites=true&w=majority`
    constructor(){

    }
    set cadenaConexion(_cadenaConexion: string){
        this._cadenaConexion = _cadenaConexion
    }

    conectarBD = async () => {
        const promise = new Promise<string>( async (resolve, reject) => {
            await mongoose.connect(this._cadenaConexion, {
            })
            .then( () => resolve(`Conectado a ${this._cadenaConexion}`) )
            .catch( (error) => reject(`Error conectando a ${this._cadenaConexion}: ${error}`) ) 
        })
        return promise

    }

    desconectarBD = async () => {

        const promise = new Promise<string>( async (resolve, reject) => {
            await mongoose.disconnect() 
            .then( () => resolve(`Desconectado de ${this._cadenaConexion}`) )
            .catch( (error) => reject(`Error desconectando de ${this._cadenaConexion}: ${error}`) )     
        })
        return promise
    }
}

export const db = new DataBase()
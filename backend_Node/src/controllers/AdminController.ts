import express from "express";
import UserModel from '../models/User'
import RestoranModel from '../models/Restoran'

export class AdminController{

    zahtevi = (req: express.Request, res: express.Response) => {
        UserModel.find({'odobren': false}).then(
            (user) => {
                res.json(user)
            }
        ).catch((err) => {
            console.log(err)
        })
    }

    odobri = (req: express.Request, res: express.Response) => {
        let kor_ime = req.body.kor_ime

        UserModel.updateOne({'kor_ime': kor_ime}, {$set: {'odobren': true}}).then(
            (user) => {
                res.json({'msg': 'uspesno'})
            }
        ).catch((err) => {
            console.log(err)
        })
    }

    deaktiviraj = (req: express.Request, res: express.Response) => {
        let kor_ime = req.body.kor_ime

        UserModel.updateOne({'kor_ime': kor_ime}, {$set: {'odobren': false}}).then(
            (user) => {
                res.json({'msg': 'uspesno'})
            }
        ).catch((err) => {
            console.log(err)
        })
    }

    konobar = (req: express.Request, res: express.Response) => {
        let kor_ime = req.body.kor_ime
        let restoran = req.body.restoran

        UserModel.updateOne({'kor_ime': kor_ime}, {$set: {'tip': 'konobar', 'restoran': restoran}}).then(
            (user) => {
                res.json({'msg': 'uspesno'})
            }
        ).catch((err) => {
            console.log(err)
        })
    }

    restoran = (req: express.Request, res: express.Response) => {
        let restoran = new RestoranModel(req.body.restoran)
        let id = 0

        RestoranModel.find({}).then(
            (restorani)=>{
                restorani.forEach(restoran=>{
                    if(id < restoran.id){
                        id = restoran.id
                    }
                })
                id = id + 1

                restoran.id = id
                restoran.save().then(
                    (user) => {
                        res.json({'msg': 'uspesno'})
                    }
                ).catch((err) => {
                    console.log(err)
                })
            }
        ).catch((err) => {
            console.log(err)
        })
    }
}
/**
 * UsersController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
const Users = require("../models/Users");

module.exports = {

    list: async function (req, res, next) {
        if (req.params.id)
            var data = await Users.single(req.params)
        else
            var data = await Users.allUser();
        res.send(data);
    },

    registration: async function (req, res) {
        try{
            // console.log('registration ==> ', req.body);
            if (req.body.password !== req.body.confirmPassword) 
                return res.badRequest("Password not the same");

            var data = await Users.registration(req.body);
            res.send(data);
        }
        catch(err){
            return res.serverError('OOPs, Somthing went wrong. Pls try again')
        }
    },

    login: async function (req, res) {
        try{
            if (!req.body.email || !req.body.password) return res.badRequest('Email and password required');
            // console.log('login ==> ', req.body);
            var data = await Users.login(req.body);
            res.send(data);
        }
        catch(err){
            return res.serverError('OOPs, Somthing went wrong. Pls try again')
        }
    },

    single: async (req, res) => {
        let data = await Users.single(req.body)
        res.send(data)
    },

    update: async function (req, res) {
        // console.log('showdata:', req.allParams())
        let data = await Users.updateUser(req.params.id, req.body)
        res.send(data)
    },

    delete: async (req, res) => {
        let data = await Users.delete(req.params.id)
        res.send(data)
    },
};


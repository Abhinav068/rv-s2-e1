const { Router } = require('express');
const { UserModel } = require('../model/user.model');
const bcrypt = require('bcrypt');
const jwt=require('jsonwebtoken');
require('dotenv').config();

const userRouter = Router();

userRouter.post('/register', async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const ispresent = await UserModel.findOne({ email });
        if(ispresent){
            res.status(404).send('user already present');
            return;
        }

        const hash = bcrypt.hashSync(password, +process.env.salt);

        const user = new UserModel({ name, email, password: hash });
        await user.save();

        res.status(201).send('user registerd');

    } catch (error) {
        console.log(error);
    }

})

userRouter.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        
        let user = await UserModel.findOne({ email });
        if(!user){
            res.status(404).send('user not found');
            return;
        }

        const hash = bcrypt.compareSync(password, user.password);
        
        if(hash){
            var token = jwt.sign({user}, process.env.tokenkey);
            res.status(201).send({token});
        }
        else{
            res.status(404).send('invalid credentials');
        }



    } catch (error) {
        console.log(error);
    }

})



module.exports = { userRouter };
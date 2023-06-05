const Router = require("express");
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const config = require("config");
const jwt = require("jsonwebtoken");
const authMiddleware = require('../middleware/auth.middleware')

const { check, validationResult } = require("express-validator");

const router = new Router();

router.post('/registration',
  [
    check('email', "Uncorrected email").isEmail(),
    check('password', "Password must be longer than 3 and shortest than 15 symbols").isLength({min:3, max:15}),
  ],
  async (req, res) => {
  console.log(req.body)
  try {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({message: "Uncorrected request", errors})
    }

    const { email, password, IdInstance, ApiTokenInstance } = req.body;

    const candidate = await User.findOne({email})
    if (candidate) {
      return res.status(400).json({message: `User with email ${email} already exist`})
    }
    const hashPassword = await bcrypt.hash(password, 8)
    const user = new User({ email, password: hashPassword, IdInstance, ApiTokenInstance })
    await user.save()
    return res.json({message: "User was created"})
  } catch (e) {
    console.log(e);
    res.send({message: "Server error"})
  }
})

router.post('/login',
  async (req, res) => {
    try {
      const { email, password, } = req.body;
      const user = await User.findOne({email});
      if (!user) {
        return res.status(404).json({message: `User with ${email} not found`});
      }
      const isPassValid = bcrypt.compareSync(password, user.password);
      if ( !isPassValid ) {
        return res.status(400).json({message: `This password is not correct`});
      }
      const token = jwt.sign({id: user.id}, config.get("secretKey"), {expiresIn: "1h"});
      return res.json({
        token,
        user: {
          id: user.id,
          email: user.email,
          IdInstance: user.IdInstance,
          ApiTokenInstance: user.ApiTokenInstance
        }
      })
    } catch (e) {
      console.log(e);
      res.send({message: "Server error"})
    }
  })

router.get('/auth', authMiddleware,
  async (req, res) => {
    try {
      const user = await User.findOne({_id: req.user.id});
      const token = jwt.sign({id: user.id}, config.get("secretKey"), {expiresIn: "1h"});
      return res.json({
        token,
        user: {
          id: user.id,
          email: user.email,
          IdInstance: user.IdInstance,
          ApiTokenInstance: user.ApiTokenInstance
        }
      })
    } catch (e) {
      console.log(e);
      res.send({message: "Server error"})
    }
  })

module.exports = router
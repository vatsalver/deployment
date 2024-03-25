const express = require('express')
const router = express.Router()
const User = require('../models/User')
const { body, validationResult } = require('express-validator');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const jwtsecret = "helloiamvatsaltellohelokstncjkei"

router.post("/createuser", [
   body('email').isEmail(),
   body('name').isLength({ min: 6 }),
   body('password', 'Incorrect Password').isLength({ min: 8 })]
   , async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
         return res.status(400).json({ errors: errors.array() });
      }

       const salt = await bcrypt.genSalt(10);
       let secPass = await bcrypt.hash(req.body.password,salt)

      try {
         await User.create({
            name: req.body.name,
            password: secPass,
            email: req.body.email,
            location: req.body.location
         })
         res.json({ success: true })
      } catch (error) {
         console.log(error)
         res.json({ success: false })
      }
   })
router.post("/loginuser", [
   body('email').isEmail(),
   body('password', 'Incorrect Password').isLength({ min: 8 })], async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
         return res.status(400).json({ errors: errors.array() });
      }
      let email = req.body.email;
      try {
         let userdata = await User.findOne({ email })
         if (!userdata) {
            return res.status(400).json({ errors: "Try loggin in with correct credentials" })
         }
         const passcmp = await bcrypt.compare(req.body.password,userdata.password);
         if (!passcmp) {
            return res.status(400).json({ errors: "Try loggin in with correct credentials" })
         }
         const data ={
            user:{
               id:userdata.id
            }
         }

         const authToken = jwt.sign(data,jwtsecret)
         return res.json({ success: true , authToken:authToken })
      } catch (error) {
         console.log(error)
         res.json({ success: false })
      }
   })

module.exports = router;
const router = require("express").Router();
const User = require("../models/User");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

// REGISTER
router.post("/register", async (req, res) => {
   const newUser = new User({
       username: req.body.username,
       email: req.body.email,
       password: CryptoJS.AES.encrypt(req.body.password, process.env.PASS_SECRET_KEY).toString()
   });

   try {
       const savedUser = await newUser.save();
       const { password, ...others} = savedUser._doc;
       res.status(201).json(others);

   }
   catch (err) {
       res.status(500).json(err);
   }

});

// LOGIN
router.post("/login", async (req, res) => {
    try {
        const user = await User.findOne({username: req.body.username});
        if (!user) {
            res.status(401).json("Username does not exist!");
            return;
        }

        const hashedPassword = CryptoJS.AES.decrypt(user.password, process.env.PASS_SECRET_KEY);
        const pass = hashedPassword.toString(CryptoJS.enc.Utf8);

        if (pass !== req.body.password) {
            res.status(401).json("Username and password do not match!");

            return;
        }
        const accessToken = jwt.sign({
           id: user._id,
           isAdmin: user.isAdmin
        }, process.env.JWT_SECRET_KEY,
            {expiresIn: "1d"}
        );
        const { password, ...others} = user._doc;
        res.status(200).json({...others, accessToken});
    }
    catch (err) {
        res.json(err).status(500);
    }
});

module.exports = router;
const express = require('express');
const router = express.Router();
const passport = require("../config/passport"); // 修正: config/passport.jsからインポート

router.get('/', function (req, res, next) {
  const isAuth = req.isAuthenticated();
  res.render("signin", {
    title: "Sign in",
    isAuth: isAuth,
  });
});

router.post('/', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/signin',
    failureFlash: true,
  }));

module.exports = router;
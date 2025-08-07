const express = require('express');
const router = express.Router();
const knex = require('../db/knex');

router.get('/', function (req, res, next) {
  const isAuth = req.isAuthenticated();
  if (isAuth) {
    const userId = req.user.id;
    knex("bmi_records")
      .select("*")
      .where({user_id: userId})
      .then(function (results) {
        res.render('index', {
          title: 'BMI記録アプリ',
          records: results,
          isAuth: isAuth,
          user: req.user,
        });
      })
      .catch(function (err) {
        console.error(err);
        res.render('index', {
          title: 'BMI記録アプリ',
          isAuth: isAuth,
          errorMessage: [err.sqlMessage],
        });
      });
  } else {
    res.render('home', {
      title: 'BMI記録アプリ',
      isAuth: isAuth,
    });
  }
});

router.post('/', function (req, res, next) {
  const isAuth = req.isAuthenticated();
  if (!isAuth) {
    return res.redirect('/');
  }

  const userId = req.user.id;
  const height = req.user.height;
  const weight = req.body.weight;

  const heightInMeters = height / 100;
  const bmi = weight / (heightInMeters * heightInMeters);

  knex("bmi_records")
    .insert({user_id: userId, weight: weight, bmi: bmi})
    .then(function () {
      res.redirect('/')
    })
    .catch(function (err) {
      console.error(err);
      res.render('index', {
        title: 'BMI記録アプリ',
        isAuth: isAuth,
        errorMessage: [err.sqlMessage],
      });
    });
});

router.use('/signup', require('./signup'));
router.use('/signin', require('./signin'));
router.use('/logout', require('./logout'));

module.exports = router;
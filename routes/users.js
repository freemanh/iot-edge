var express = require('express');
var router = express.Router();
const UserModel = require('../models/User')

/* GET users listing. */
router.get('/', function (req, res, next) {
  UserModel.find((err, users) => {
    res.send(users)
  })
});

module.exports = router;

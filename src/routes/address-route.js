module.exports = app => {
  const address = require("../controllers/address-controller")

  var router = require("express").Router();

  router.post("/", address.createAddress);

  app.use('/address', router);
};
module.exports = app => {
  const user = require("../controllers/user-controller")

  var router = require("express").Router();

  // Create a new register
  router.post("/", user.createUser);

  router.get("/",  user.findAllUsers)

  router.get('/:id', user.findOneUser);
  router.put('/:id', user.updateUser);
  router.delete('/:id', user.deleteUser);

  router.post("/login", user.login);
  app.use('/user', router);
};
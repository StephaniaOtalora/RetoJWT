var express = require('express');
var router = express.Router();
var [createUser, login] = require('../controllers/user');
const HandlerGenerator = require('../handlegenerator');
const middleware = require('../middleware');

/* Create user. */
router.post('/register', async function(req, res, next) {
  const newUser = await createUser(req.body);
  res.send(newUser);
});
/** Login */
router.post('/login', HandlerGenerator.login(req,res));

module.exports = router;

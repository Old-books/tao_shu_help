import express from 'express';
import _ from 'lodash';
import sha1 from 'sha1';


const router = express.Router();
router.post('/', (req, res, next) => {
  const name = req.body.name;
  const password = req.body.password;
  console.log(name);
  console.log(password);
  if (_.isEmpty(name) || _.isEmpty(password)) {
    return res.status(400).send('name and password can not be null');
  }
  else {
    User.findOne({name}, (err, userData) => {
      if (err) return next(err);
      if (userData === null || userData.password !== password) {
        return res.status(401).send('name or password is wrong');
      }
      else if (userData.password === password) {
        res.cookie('token', generateInfo(name, password), {maxAge: 10 * 1000});
        return res.status(201).send('login success');
      }

    });
  }
  function generateInfo(userId, password) {
    return userId + ':' + sha1(password);
  }
});
export default router;

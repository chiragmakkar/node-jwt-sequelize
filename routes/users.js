import express from 'express';
import { User } from '../utils/users';
import jwt from 'jsonwebtoken';
import { auth } from '../utils/auth';
import bcrypt from 'bcrypt';
import { Users } from '../utils/connectDB';
const router = express.Router();

router.post('/signup', async (req, res, next) => {
  const { name, password, email } = req.body;
  if(name && password && email){
    let hash = bcrypt.hashSync(password, Number(process.env.salt))
    let user = await User.create({ name, password: hash, email });
    res.json({ success: true, token: jwt.sign(user.toJSON(), process.env.secret) });
  }
  else res.status(400).json({ success: false, message: 'Bad Request'})
});

router.post('/signin', async (req, res, next) => {
  const { email, password } = req.body;
  if(email && password){
    let user = await User.one({ email }, false);
    if(!user) res.status(401).json({ success: false, message: 'No such user found'});

    let authenticated = bcrypt.compareSync(password, user.password)
    if(user && authenticated){
      res.json({ success: true, token: jwt.sign(user.toJSON(), process.env.secret) });
    }
    else res.status(401).json({ success: false, message: 'Incorrect Password'});
  }
  else res.status(400).json({ success: false, message: 'Bad Request'});
});

router.post('/profile', async (req, res, next) => {
  if(req.body.email){
    let user = await User.one({ email: req.body.email }, true);

    if(!user) res.status(401).json({ success: false, message: 'No such user found'});
    else res.json({ success: true, user });
  }
  else res.status(400).json({ success: false, message: 'Bad Request'});
});

router.get('/profiles/all', auth, async (req, res, next) => {
  res.json(await User.all());
});

router.post('/profile/update', auth, async (req, res, next) => {
  const { email, name } = req.body;
  if(email, name){
    let updated = await User.update(req.body.doc, email, name)
    if(updated) res.json({ success: true, user: updated})
    else res.status(401).json({ success: false, message: 'Something went wrong.'})
    // Users.update({email : req.body.doc.email}, {where : { email : email }})
    // .then((user) => res.json(user))
  }
  else res.status(400).json({ success: false, message: 'Bad Request'});
});

module.exports = router;

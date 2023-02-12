import { Router } from "express";

const router = Router ();

const users = [];

//middleware nivel de router
router.use((req, res, next) => {
  console.log('time router: ', Date.now());
  next();
})

router.get('/', (req, res) => {
  res.send({ users });
});

router.post('/', (req, res) => {
  const user = req.body;
  user.push(user);
  res.send({ status: 'success' });
})

export default router;
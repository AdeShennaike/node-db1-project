const router = require('express').Router()
const Accounts = require('./accounts-model')
const {checkAccountPayload, checkAccountNameUnique, checkAccountId} = require('./accounts-middleware')

router.get('/', (req, res, next) => {
  // DO YOUR MAGIC
  Accounts.getAll()
    .then(account => {
      res.json(account)
    })
    .catch(err => {
      next(err)
    })
})

router.get('/:id', checkAccountId, async (req, res, next) => {
  // DO YOUR MAGIC
  try{
    const accounts = await Accounts.getById(req.params.id)
    res.json(accounts)
  }catch(err){
    next(err)
  }
})

router.post('/', checkAccountNameUnique, checkAccountPayload, async (req, res, next) => {
  // DO YOUR MAGIC
  const {name, budget} = req.body

  try{
    const newAccount = await Accounts.create({name: name.trim(), budget: budget})
    res.status(201).json(newAccount)
  }catch(err){
    next(err)
  }
})

router.put('/:id', checkAccountId, checkAccountNameUnique, checkAccountPayload, async (req, res, next) => {
  // DO YOUR MAGIC
  const {name, budget} = req.body
  const change = {name: name.trim(), budget: budget}
  try{
    const account = await Accounts.update(change)
    res.status(201).json(account)
  }catch(err){
    next(err)
  }
});

router.delete('/:id', checkAccountId, async (req, res, next) => {
  // DO YOUR MAGIC
  try{
    const killAccount = await Accounts.deleteById(req.params.id)
    res.json(killAccount)
  }catch(err){
    next(err)
  }
})

router.use((err, req, res, next) => { // eslint-disable-line
  // DO YOUR MAGIC
  res.status(err.status || 500).json({
    message: err.message || 'WHoops! Something went wrong!',
    stack: err.stack
  })
})

module.exports = router;

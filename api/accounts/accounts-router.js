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

router.get('/:id', checkAccountId, (req, res, next) => {
  // DO YOUR MAGIC
})

router.post('/', checkAccountNameUnique, checkAccountPayload, (req, res, next) => {
  // DO YOUR MAGIC
})

router.put('/:id', checkAccountId, checkAccountNameUnique, checkAccountPayload, (req, res, next) => {
  // DO YOUR MAGIC
});

router.delete('/:id', checkAccountId, (req, res, next) => {
  // DO YOUR MAGIC
})

router.use((err, req, res, next) => { // eslint-disable-line
  // DO YOUR MAGIC
  res.status(err.status || 500).json({
    message: err.message || 'WHoops! Something went wrong!',
    stack: err.stack
  })
})

module.exports = router;

const db = require('../../data/db-config')
const Accounts = require('./accounts-model')

exports.checkAccountPayload = (req, res, next) => {
  // DO YOUR MAGIC
  // Note: you can either write "manual" validation logic
  // or use the Yup library (not currently installed)
  const {name, budget} = req.body
  
  if(!name || !budget){
    next({message: "name and budget are required"})
  }else if(name.trim() < 3 || name.trim() > 100){
    next({ status: 400, message: "name of account must be between 3 and 100" })
  }else if(isNaN(budget) || typeof budget !== 'number'){
    next({ status: 400, message: "budget of account must be a number" })
  }else if(budget < 0 || budget > 1000000){
    next({ status: 400, message: "budget of account is too large or too small" })
  }else{
    next()
  }
}

exports.checkAccountNameUnique = async (req, res, next) => {
  // DO YOUR MAGIC
  const {name} = req.body
  const nameInUse = await db('accounts').where('name', name.trim().first())

  if(nameInUse){
  next({ status: 400, message: "that name is taken" })
  }else{
    next()
  }
}

exports.checkAccountId = async (req, res, next) => {
  // DO YOUR MAGIC
  const id = await Accounts.getById(req.params.id)
  
  if(!id){
    next({ status: 404, message: "account not found" })
  }else{
    next()
  }
}

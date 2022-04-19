const db = require('../../data/db-config')

const getAll = async () => {
  // DO YOUR MAGIC
  return await db('account')
}

const getById = async id => {
  // DO YOUR MAGIC
  return await db('account')
  .where('id', id)
  .first()
}

const create = async account => {
  // DO YOUR MAGIC
  return await db('account')
  .insert({name: account.name, budget: account.budget})
}

const updateById = async (id, account) => {
  // DO YOUR MAGIC
  return await db('account')
  .where("id", id)
  .update({name: account.name, budget: account.budget})
}

const deleteById = async id => {
  // DO YOUR MAGIC
  return await db('account')
  .where("id", id)
  .del()
}

module.exports = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
}

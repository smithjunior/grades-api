import db from '../models/index.js'

const Grade = db.grade

const getAll = async () => {
  return await Grade.find({})
}
const get = async (id) => {
  return await Grade.findById({ _id: id })
}

const create = async (grade) => {
  return await Grade.create(grade)
}

const update = async (id, grade) => {
  const _id = id
  return await Grade.findByIdAndUpdate(_id, grade, { new: true })
}

const remove = async (id) => {
  return await Grade.findByIdAndDelete({ _id: id })
}

const removeAll = async () => {
  return await Grade.remove({})
}

const findByName = async (name) => {
  return await Grade.find({ name: { $regex: RegExp(name), $options: 'i' } })
}

export {
  getAll,
  get,
  create,
  update,
  remove,
  removeAll,
  findByName
}

import express from 'express'
import {
  getAll,
  get,
  create,
  update,
  remove,
  removeAll,
  findByName
} from '../controllers/grade.js'

const router = express.Router()

router.get('/', async (request, response) => {
  const name = request.query.name
  try {
    const grades = name === '' || !name ? await getAll() : await findByName(name)

    return response.json(grades)
  } catch (err) {
    return response
      .status(400)
      .json({ error_message: err.message })
  }
})

router.get('/:gradeId', async (request, response) => {
  const { gradeId } = request.params
  try {
    const grade = await get(gradeId)

    return response.json(grade)
  } catch (err) {
    return response
      .status(400)
      .json({ error_message: err.message })
  }
})

router.post('/', async (request, response) => {
  const { name, subject, type, value } = request.body
  try {
    const grade = await create({ name, subject, type, value: parseFloat(value) })
    return response.json(grade)
  } catch (err) {
    return response
      .status(400)
      .json({ error_message: err.message })
  }
})

router.delete('/:gradeId', async (request, response) => {
  const { gradeId } = request.params
  try {
    await remove(gradeId)
    return response.send({ message: 'Grade excluido com sucesso' })
  } catch (err) {
    return response
      .status(400)
      .json({ error_message: err.message })
  }
})
router.put('/:gradeId', async (request, response) => {
  const { gradeId } = request.params

  const { name, subject, type, value } = request.body
  try {
    const gradeUpdated = await update(gradeId,
      {
        name,
        subject,
        type,
        value: parseFloat(value)
      })
    return response.json(gradeUpdated)
  } catch (err) {
    return response
      .status(400)
      .json({ error_message: err.message })
  }
})
router.delete('/', async (request, response) => {
  try {
    await removeAll()
    return response.send({
      message: 'Grades excluidos'
    })
  } catch (err) {
    return response
      .status(400)
      .json({ error_message: err.message })
  }
})

export default router

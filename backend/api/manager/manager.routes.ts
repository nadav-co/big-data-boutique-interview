import express from 'express'
const { getManager, updateManager, saveManager, getManagers } = require('./manager.controller')

const router = express.Router()

router.get('/:id', getManager)
router.get('/', getManagers)
router.put('/:id', updateManager)
router.post('/', saveManager)

module.exports = router
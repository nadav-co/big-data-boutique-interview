import express from 'express'
const { getOccupations } = require('./occupation.controller')

const router = express.Router()

router.get('/:year', getOccupations)

module.exports = router
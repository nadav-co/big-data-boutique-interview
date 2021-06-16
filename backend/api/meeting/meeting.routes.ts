import express from 'express'
const { getMeetings, getMeeting, updateMeeting, saveMeeting, getOccupations } = require('./meeting.controller')

const router = express.Router()

router.get('/occupation/:month/:day/:year', getOccupations)
router.get('/:month/:day/:year', getMeetings)
router.get('/:id', getMeeting)
router.put('/:id', updateMeeting)
router.post('/', saveMeeting)

module.exports = router
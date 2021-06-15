import express from 'express'
const { getMeetings, getMeeting, updateMeeting, saveMeeting } = require('./meeting.controller')

const router = express.Router()

router.get('/:month/:day/:year', getMeetings)
router.get('/:id', getMeeting)
router.put('/:id', updateMeeting)
router.post('/', saveMeeting)

module.exports = router
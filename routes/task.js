const express = require('express')
const router = express.Router()

const taskService = require('../services/task.service')

router.get('/', taskService.getTasks)


module.exports = router

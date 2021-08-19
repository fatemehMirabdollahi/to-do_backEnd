const express = require('express')
const router = express.Router()

const listService = require('../services/list.service')

router.get('/', listService.getLists)

module.exports = router

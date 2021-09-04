const express = require('express')
const router = express.Router()

const listService = require('../services/list.service')

router.get('/', listService.getLists)
router.post('/', listService.addList)
router.delete('/',listService.deleteList)
module.exports = router

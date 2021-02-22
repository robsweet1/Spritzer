const express = require('express')
const router = express.Router()

router.use('', require('./profileRoutes'))
router.use('', require('./spriteRoutes'))

module.exports = router
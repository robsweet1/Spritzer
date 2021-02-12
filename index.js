const express = require('express')
const mongoose = require('mongoose')
const passport = require('passport')
const cors = require('cors')
require('dotenv').config()
require('./auth/auth')
const routes = require('./routes/routes')
const secureRoutes = require('./routes/secretRoutes')

const port = process.env.PORT || 5000

mongoose.set('useCreateIndex', true)

mongoose
    .connect(
        process.env.MONGO_URI,
        {useNewUrlParser: true, useUnifiedTopology: true}
    )
    .then(() => {


        const app = express()
        app.use(express.json())
        app.use(express.urlencoded({ extended: true }))
        app.use(cors())

        app.use('/', routes)

        app.use('/user', passport.authenticate('jwt', { session: false }), secureRoutes)

        app.use(function(err, req, res, next) {
            res.status(err.status || 500)
            res.json({ error: err })
        })

        app.listen(port, () => {
            console.log(`Server running on port ${port}`)
        })
    })

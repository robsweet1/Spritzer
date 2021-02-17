const express = require('express')
const passport = require('passport')
const jwt = require('jsonwebtoken')

const router = express.Router()

router.post(
    '/signup',
    passport.authenticate('signup', { session: false }),
    async (req, res, next) => {
        try{
            res.json({
                message: 'Succesful Signup',
                user: req.user
            })
        }
        catch (error) {
            return next(error)
        }
    }
)

router.post(
    '/login',
    async (req, res, next) => {
        passport.authenticate(
            'login', 
            async (err, user, info) => {
                try {
                    if (err || !user) {
                        const error = new Error('Error Occured')

                        return next(error)
                    }
                    req.login(
                        user,
                        { session: false },
                        async (error) => {
                            if (error) return next(error)

                            const body = { _id: user._id, email: user.email }
                            const token = jwt.sign({ user: body}, 'TOP_SECRET')

                            return res.json({
                                message: 'Successful Login',
                                token: token,
                            })
                        }
                    )
                }
                catch (error) {
                    return next(error)
                }
            }
        )(req, res, next)
    }
   
)

module.exports = router
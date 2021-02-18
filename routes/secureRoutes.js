const express = require('express')
const Sprite = require('../models/SpriteModel')
const router = express.Router()

router.get(
    '/profile',
    (req, res, next) => {
        res.json({
            message: 'You made it to the secure route',
            user: req.user,
            token: req.query.secret_token
        })
    }
)

router.post(
    '/sprite',
    async (req, res, next) => {
        try {
            let sprite = await Sprite.findOne({ id: req.body.id })
            if (!sprite){
                sprite = new Sprite()
            }
            sprite.id = req.body.id
            sprite.name = req.body.name
            sprite.frames = req.body.frames
            sprite.email = req.body.email

            await sprite.save()
            res.status(200).send(sprite)
        }
        catch (error) {
            res.status(400).send({ error: error })
        }

    }
)

module.exports = router
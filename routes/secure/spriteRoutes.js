const express = require('express')
const Sprite = require('../../models/SpriteModel')
const router = express.Router()

router.post(
    '/sprite',
    async (req, res, next) => {
        try {
            let sprite = await Sprite.findOne({ id: req.body.id })

            if (!sprite) {
                sprite = new Sprite()
            }
            sprite.id = req.body.id
            sprite.name = req.body.name
            sprite.frames = req.body.frames
            sprite.dimensions = req.body.dimensions
            sprite.email = req.body.email
            console.log(req.body.dimensions)
            await sprite.save()
            res.status(200).send(sprite)
        }
        catch (error) {
            console.log(error)
            res.status(400).send({ error: error })
        }

    }
)

router.get(
    '/sprite/:id',
    async (req, res, next) => {
        try {
            let sprite = await Sprite.findOne({ id: req.params.id })

            if (!sprite) {
                res.status(404).send({ message: 'sprite not found' })
            }
            else if (sprite.email !== req.user.email) {
                res.status(403).send({ message: 'Cannot access sprite of another user' })
            }
            else {
                res.status(200).send(sprite)
            }
        }
        catch (error) {
            console.log(error)
            res.status(400).send({ error: error })
        }
    }
)

router.get(
    '/sprites',
    async (req, res, next) => {
        try {
            let sprites = await Sprite.find({ email: req.user.email })

            res.status(200).send(sprites)
        } 
        catch (error) {
            console.log(error)
            res.status(400).send({ error: error })
        }
    }
)

module.exports = router
const express = require('express')
const { PrismaClient } = require('@prisma/client');
const router = express.Router()

const prisma = new PrismaClient();

const cards = []

router.get("/", async(req,res)=> {
    const allCards = await prisma.card.findMany();
    res.json(allCards);
})

router.post('/', async (req, res) => {
    if (!req.body.message || !req.body.gif) {
    return res.status(400).send('Image and title are required.')
    }
    const { message, gif, isDeleted } = req.body
    const newCard = await prisma.card.create({
        data: {
        message,
        gif,
        isDeleted
        }
    })
    res.json(newCard)
})

router.put('/:cardId', async(req, res) => {
    if (!req.body.message || !req.body.gif) {
    return res.status(400).send('Name and date are required.')
    }
    const { cardId } = req.params
    const { message, gif, isDeleted } = req.body
    const updatedCard = await prisma.card.update({
        where: { boardId: parseInt(cardId) },
        data: {
        message,
        gif,
        isDeleted
        }
    })
    res.json(updatedCard)
})

router.delete('/:cardId', async (req, res) => {
    const { cardId } = req.params
    const deleteCard = await prisma.card.delete({
        where: { boardId: parseInt(cardId) }
    })
    res.json(deleteCard)
})

module.exports = router 
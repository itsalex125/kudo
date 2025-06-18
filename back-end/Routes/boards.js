const express = require('express')
const { PrismaClient } = require('@prisma/client');
const router = express.Router()


const prisma = new PrismaClient();

const boards = []

router.get("/", async(req,res)=> {
    const allBoards = await prisma.board.findMany();
    res.json(allBoards);
})

router.post('/', async (req, res) => {
    if (!req.body.image || !req.body.title) {
    return res.status(400).send('Image and title are required.')
    }
    const { image, title } = req.body
    const newBoard = await prisma.board.create({
        data: {
        image,
        title
        }
    })
    res.json(newBoard)
})

router.put('/:boardId', async(req, res) => {
    if (!req.body.image || !req.body.title) {
    return res.status(400).send('Name and date are required.')
    }
    const { boardId } = req.params
    const { image, title } = req.body
    const updatedBoard = await prisma.board.update({
        where: { id: parseInt(boardId) },
        data: {
        image,
        title
        }
    })
    res.json(updatedBoard)
})

router.delete('/:boardId', async (req, res) => {
    const { boardId } = req.params
    const deletedBoard = await prisma.board.delete({
        where: { id: parseInt(boardId) }
    })
    res.json(deletedBoard)
})

module.exports = router 
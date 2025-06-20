const express = require('express')
const { PrismaClient } = require('@prisma/client');
const router = express.Router()

const prisma = new PrismaClient();

router.get("/", async(req,res)=> {
    try{
        const allBoards = await prisma.board.findMany({
            include: {
                cards: true
            },
            orderBy:{
                createdAt: 'desc'
            }
        });
        res.json(allBoards);
    }catch(error){
        res.status(500). json({error: "Could not load in Boards"});
    }
})

router.get("/:boardId", async(req,res)=> {
    try{
        const {boardId} = req.params;
        const board = await prisma.board.findUnique({
            where: { id: parseInt(boardId)},
            include: {
                cards: {
                    orderBy:{
                        createdAt: 'desc'
                    }
                }
            }
        });
        if(!board){
            return res.status(404).json({ error: 'Board not found'});
        }
        res.json(board)
    }catch(error){
        res.status(500). json({error: "Could not load in Boards"});
    }
})

router.post('/', async (req, res) => {
    try{
        const { title, description, category, image, author } = req.body;

        if(!title|| !description || !category || !image ){
            return res.status(400).json({error: 'Title, description, category, and image NEEDED!'})
        }
        const newBoard = await prisma.board.create({
            data: {
                title, 
                description,
                category,
                image,
                author: author || null
            }
        });

        res.status(201).json(newBoard);
    } catch (error) {
        res.status(500).json({error: 'New board could not be created'});
    }
})

router.put('/:boardId', async(req, res) => {
    try{
        const{ boardId } = req.params;
        const { title, description, category, image, author } = req.body;

        if(!title|| !description || !category || !image ){
            return res.status(400).json({error: 'Title, description, category, and image NEEDED!'})
        }
        const updatedBoard = await prisma.board.update({
            data: {
                title, 
                description,
                category,
                image,
                author: author || null
            }
        });

        res.json(updatedBoard);
    } catch (error) {
        res.status(500).json({error: 'Board could not be updated'});
    }
})

router.delete('/:boardId', async (req, res) => {
    try{
        const { boardId } = req.params
        const deletedBoard = await prisma.board.delete({
            where: { id: parseInt(boardId) }
        });
        res.json(deletedBoard)
    } catch (error){
        res.status(500).json({ error: error.message });
    }
})

module.exports = router 
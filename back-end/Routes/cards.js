const express = require('express')
const { PrismaClient } = require('@prisma/client');
const router = express.Router()

const prisma = new PrismaClient();

router.get("/", async(req,res)=> {
    try{
        const allCards = await prisma.card.findMany({
            include:{
                board: true
            },
            orderBy: {
                createdAt: 'desc'
            }
        });
        res.json(allCards);
    }catch( error) {
        res.status(500).json({ error: 'Cards could not be retrieved.'})
    }
})

router.get("/board/:boardId", async(req,res)=> {
    try{
        const { boardId } = req.params;
        const cards = await prisma.card.findMany({
            where: { boardId: parseInt(boardId)},
            orderBy: {
                createdAt: 'desc'
            }
        });
        res.json(cards);
    }catch( error) {
        res.status(500).json({ error: 'Cards could not be retrieved.'})
    }
})

router.post('/', async (req, res) => {
    try{
        const { title, description, media, author, boardId } = req.body;
        if (!title || !description || !media || boardId) {
        return res.status(400).send('Title, description, media, and boardId are NEEDED!')
        }
        const newCard = await prisma.card.create({
            data: {
            title,
            description,
            media,
            author: author || null.PrismaClient,
            boardId: parseInt(boardId)
            }
        });
        res.status(201).json(newCard)
    } catch (error) {
        res.status(500).json({ error: 'Card could not be posted.'})
    }
})

router.put('/:cardId', async(req, res) => {
    try{
        const { cardId } = req.params;
        const { title, description, media, author, upvotes } = req.body;

        const updateData = {};
        if(title !== undefined) updateData.title = title;
        if(description !== undefined) updateData.description = description;
        if(media !== undefined) updateData.media = media;
        if(author !== undefined) updateData.author = author;
        if(upvotes !== undefined) updateData.upvotes = upvotes;

        const updatedCard = await prisma.card.update({
            where: { id: parseInt(cardId)},
            data: updateData
        });
        res.json(updatedCard)
    } catch (error) {
        res.status(500).json({ error: 'Card could not be updated.'})
    }
})

router.delete('/:cardId', async (req, res) => {
    try{
        const { cardId } = req.params
        const deletedCard = await prisma.card.delete({
            where: { id: parseInt(cardId) }
        });
        res.json(deletedCard)
    } catch (error){
        res.status(500).json({ error: error.message });
    }
})

module.exports = router 
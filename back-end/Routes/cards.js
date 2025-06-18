const express = require('express')
const { PrismaClient } = require('@prisma/client')
const router = express.Router()
const prisma = new PrismaClient();

router.get("/", async(req,res)=> {
    const cards = await prisma.card.findMany();
    console.log(cards);
    res.json(cards);
})

module.exports = router 
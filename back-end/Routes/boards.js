const express = require('express')
const { PrismaClient } = require('@prisma/client');
const router = express.Router()


const prisma = new PrismaClient();

router.get("/", async(req,res)=> {
    const boards = await prisma.board.findMany();
    console.log(boards);
    res.json(boards);
})


module.exports = router 
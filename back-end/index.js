const express = require('express')
const cors = require('cors');
const app = express()
const PORT = 5432

app.use(cors( {
    origin: "*",
    methods: "GET,PUT,POST,DELETE"
}))
app.use(express.json())

const boardRoutes = require(`./Routes/boards`)
app.use(`/board`, boardRoutes)

const cardRoutes = require(`./Routes/cards`)
app.use(`/card`, cardRoutes)

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
})

app.get('/', (req, res) => {
    res.send('Welcome to my KudoBoard App!')
})
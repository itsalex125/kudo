const express = require('express')
const app = express()
const PORT = 9009

app.use(express.json())

const boardRoutes = require(`./Routes/boards`)
app.use(`/boards`, boardRoutes)

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
})

app.get('/', (req, res) => {
    res.send('Welcome to my KudoBoard App!')
})
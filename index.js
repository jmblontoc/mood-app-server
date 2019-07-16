const express = require('express')
const cors = require('cors')
const app = express()

app.use(cors())

const port = 9000

const Datastore = require('nedb')
    , db = new Datastore({ filename: 'database.db' })

db.loadDatabase((err) => {
    if (err) {
        console.log("Error")
    }
})

app.use(express.json())

/* Routes */

// index
app.get("/", (req, res) => {
    res.json({
        message: "Hello there"
    })
})

// post entry
app.post("/", (req, res) => {

    let name = req.body.name
    let mood = req.body.mood

    db.insert({
        name: name,
        mood: mood,
        date: (new Date()).toString()
    },
    (err, entry) => {
        if (err) {
            res.status(501).json({
                error: err
            })
        }

        res.status(200).json({
            message: 'Entry successfully added',
            entry: entry
        })
    })
})

// get all entries
app.get("/entries", (req, res) => {

    db.find({}, (err, entries) => {
        if (err) {
            res.status(501).json({
                error: err
            })
        }

        res.json({
            data: entries
        })
    })
})

// Listen
app.listen(port, () => {
    console.log(`I am on port ${port}`)
})
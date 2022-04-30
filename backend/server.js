const express = require('express');
const db = require("../database/database.js")
const date = new Date()
const app = express()
const port = 5000

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('./front'));

app.listen(port, () => {
    console.log(`Server is active on port ${port}`)
  })

app.get('/MentalLog', (req, res) => {
    /** Takes users to landing page*/
        res.sendFile('index.html', { root: 'front' })
});


app.get("/MentalLog/CreateAccount/:name/:password", (req, res) => {
    /*Checks to see if name and password exists already in the database
    if not, creates a new account**/
    const stmt = db.prepare("SELECT COUNT(*) FROM dailylog WHERE name='" + req.params.name + "' AND password='" + req.params.password + "'")
    const result = stmt.get()
    if(result["COUNT(*)"] !== 0){
        res.status(200).send("Please try a different password")
    } else {
        /*Creating a new account**/
        newAccount = db.prepare("INSERT INTO dailylog (name, password, data, lastLog) VALUES (?,?,?,?)")
        newAccount.run(
        String(req.params.name), 
        String(req.params.password),
        String(""),
        String(0)
        )
        res.status(200).send("account created")
    }
})

app.get('/MentalLog/LogIn/:name/:password', (req, res) => {
    /*Checks to see if name and password are in database,
    if so, takes to home page and gives data to front to display*/
    const stmt = db.prepare("SELECT * FROM dailylog WHERE name='" + req.params.name + "' AND password='" + req.params.password + "'")
    const result = stmt.get()
    console.log(result)
    if(result === undefined){
        res.send("invalid name or password")
    }

    //TODO pass name and data to home html. Here is link might be helpful https://www.youtube.com/watch?v=5-ptp9tRApM
    const name = result.name
    const data = result.data
    res.status(200).sendFile('home.html', { root: 'front' })
})

app.get('/MentalLog/:choice(Up|Down|Neutral)/:name/:password', (req, res) => {
    /**Checks if name and pass are valid.
     * if data was not added today and...
     * if Up, append 2 to data
     * if Neutral, append 1 to data
     * if Down, append 0 to data
     */
    const stmt = db.prepare("SELECT * FROM dailylog WHERE name='" + req.params.name + "' AND password='" + req.params.password + "'")
    const result = stmt.get()
    if(result === undefined){
        res.send("invalid name or password")
    }
    const lastLog = result.lastLog
    const currentDate = date.getDate()
    if(lastLog === currentDate){
        res.send("Already inputted you data in for today!")
    }
    const data = result.data
    let updateData
    if(req.params.choice === "Up"){
        updateData = data.concat("2")
    } else if (req.params.choice === "Neutral"){
        updateData = data.concat("1")
    } else {
        updateData = data.concat("0")
    }
    console.log(updateData)
    const update = db.prepare("UPDATE dailylog SET lastLog='"+ currentDate +"' ,data='"+ updateData +"' WHERE name='" + req.params.name + "' AND password='" + req.params.password + "'")
    update.run()
    res.status(200).send("updated data")
  })

app.use(function(req, res){
    res.status(404).send('404 NOT FOUND')
});


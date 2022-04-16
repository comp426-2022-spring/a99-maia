/**Execute server by being in the 99-maia directory and type node ./backend/server.js*/
const express = require('express');
const path = require("path")
const db = require("../database/database.js")
const app = express()
const port = 5000

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.listen(port, () => {
    console.log(`Server is active on port ${port}`)
  })

app.get('/MentalLog/', (req, res) => {
    // Respond with status 200
        res.statusCode = 200;
    // Respond with status message "OK"
        res.statusMessage = 'OK';
        res.writeHead( res.statusCode, { 'Content-Type' : 'text/plain' });
        res.end(res.statusCode+ ' ' +res.statusMessage)
    });


app.get("/MentalLog/CreateAccount/:name/:password", (req, res) => {
    /*Checks to see if name and password exists already in the database**/
    const stmt = db.prepare("SELECT COUNT(*) FROM dailylog WHERE name='" + req.params.name + "' AND password='" + req.params.password + "'")
    const result = stmt.get()
    if(result["COUNT(*)"] !== 0){
        res.status(200).send("Please try a different password")
    } else {
        /*Creating a new account**/
        newAccount = db.prepare("INSERT INTO dailylog (name, password, data, lastlog) VALUES (?,?,?,?)")
        newAccount.run(
        String(req.params.name), 
        String(req.params.password),
        String(0),
        String("today")
        )
        res.status(200).send("account created")
    }
})

app.get('/MentalLog/LogIn/:name/:password', (req, res) => {
    const stmt = db.prepare()
})

app.get('/MentalLog/Up/:name/:user', (req, res) => {
    /**Should go to the database and add 1 to end of the string, 
    * only if date.getDate() does not equal the dy number in the data base*/
    //console.log(path.join("front", "home.html"))
    res.sendFile('home.html', { root: 'front' })
  })

app.get('/MentalLog/Down', (req, res) => {
    /**Should go to the database and add 1 to end of the string, 
    * only if date.getDate() does not equal the dy number in the data base*/
    res.status(200).send('Hello World!')
    req.body()
  })

app.get("/MentalLog/NewUser", (req, res) => {

})


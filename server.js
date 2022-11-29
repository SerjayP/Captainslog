require("dotenv").config()
const express = require("express")
const app = express()
const PORT = 3000
const mongoose = require("mongoose")
const reactViews = require("express-react-views")
const Log = require("./models/logs")

// ===== Connection to Database =====
mongoose.connect(process.env.MONGO_URI,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  mongoose.connection.once("open",() => {
    console.log("connected to mongo")
  })

app.set("view engine", "jsx");
app.engine("jsx", reactViews.createEngine());

app.use(express.urlencoded({ extended: false }));


// ======== New ========

app.get("/logs/new", (req, res)=>{
    res.render('New')
})

// ========= Index ========

app.get("/logs", (req, res)=>{
    Log.find({}, (error, allLogs)=> {
        if (!error) {
            res.status(200).render("Index", {
              logs: allLogs
            })
          } else {
            res.status(400).send(error)
          }
    })
})

// ========= Create ========

app.post("/logs", (req, res) => {
    if (req.body.shipIsBroken === "on"){
        req.body.shipIsBroken = true
    } else {
        req.body.shipIsBroken = false
    }
Log.create(req.body, (error, createdLog)=>{
    if (!error){
        res.status(200).redirect("/logs")
    } else {
        res.status(400).send(error)
    }
})
    // res.redirect("/logs/showPage") // Return to change 
})

app.listen(PORT,()=>{
    console.log('Running at port:', PORT)
})
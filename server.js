require("dotenv").config()
const express = require("express")
const app = express()
const PORT = 3000
const mongoose = require("mongoose")
const reactViews = require("express-react-views")
const Log = require("./models/logs")
const methodOverride = require('method-override');

// ===== Connection to Database =====
mongoose.connect(process.env.MONGO_URI,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  mongoose.connection.once("open",() => {
    console.log("connected to mongo")
  })

//   ======== Engine ========
app.set("view engine", "jsx");
app.engine("jsx", reactViews.createEngine());

// ===== Middleware =====
app.use((req, res, next) => {
    console.log("Im running for all routes")
    console.log("1. middleware")
    next()
  })
  app.use(express.urlencoded({extended: false}))
  app.use(methodOverride("_method"))
//   app.use(express.static('public'));


// ======== New ========

app.get("/logs/new", (req, res)=>{
    res.render('New')
})

// ========= DELETE =========
app.delete('/logs/:id', (req, res) => {
    req.body.shipIsBroken = req.body.shipIsBroken === 'on' ? true : false;
    Log.findByIdAndDelete(req.params.id, req.body, (err, updatedLog) => {
        if(!err) {
            res.status(200).redirect(`/logs`)
        } else {
            res.status(400). send(err);
        }
    })
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
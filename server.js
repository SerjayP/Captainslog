require("dotenv").config()
const express = require("express")
const app = express()
const PORT = 3000
const mongoose = require("mongoose")
const reactViews = require("express-react-views")
const Log = require("./models/logs")
const methodOverride = require('method-override');
const router = require("./controllers/logs")

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
app.use("/logs", router);

// ========= Index ========

// app.get("/logs", (req, res)=>{
//     Log.find({}, (error, allLogs)=> {
//         if (!error) {
//             res.status(200).render("Index", {
//               logs: allLogs
//             })
//           } else {
//             res.status(400).send(error)
//           }
//     })
// })

// // ======== New ========

// app.get("/logs/new", (req, res)=>{
//     res.render('New')
// })

// // ========= DELETE =========
// app.delete('/logs/:id', (req, res) => {
//     req.body.shipIsBroken = req.body.shipIsBroken === 'on' ? true : false;
//     Log.findByIdAndDelete(req.params.id, req.body, (err, updatedLog) => {
//         if(!err) {
//             res.status(200).redirect(`/logs`)
//         } else {
//             res.status(400). send(err);
//         }
//     })
// })

// //  ========== UPDATE ======= 

// app.put("/logs/:id", (req, res) => {
//     if(req.body.shipIsBroken === 'on'){
//         req.body.shipIsBroken = true;
//     } else{
//         req.body.shipIsBroken = false;
//     }
//     Log.findByIdAndUpdate(req.params.id, req.body, (err, updatedLog) => {
//       if(!err){
//         res.status(200).redirect(`/logs/${req.params.id}`)
//       } else {
//         res.status(400).send(err)
//       }
//     })
//   })



// // ========= Create ========

// app.post("/logs", (req, res) => {
//     if (req.body.shipIsBroken === "on"){
//         req.body.shipIsBroken = true
//     } else {
//         req.body.shipIsBroken = false
//     }
// Log.create(req.body, (error, createdLog)=>{
//     if (!error){
//         res.status(200).redirect("/logs")
//     } else {
//         res.status(400).send(error)
//     }
// })
//     // res.redirect("/logs/showPage") // Return to change 
// })

// // ========= Edit =========

// app.get("/logs/:id/edit", (req, res) => {
//     Log.findById(req.params.id, (err, foundLog) => {
//       if (!err) {
//         res.status(200).render("Edit", {log: foundLog})
//       } else {
//         res.status(400).send({ msg: err.message })
//       }
//     })
//   })

// //   ============= Show =======

// app.get("/logs/:id", (req, res) => {
//     // findById 1st arg: the id of the fruit we want to find 
//     // Callback 1st arg: error
//     // Callback 2nd arg: the found fruit object
//   Log.findById(req.params.id, (error, foundLog) => {
//     if (!error) {
//       res
//         .status(200)
//         .render("Show", {
//           log: foundLog
//         })
//     } else {
//       res
//         .status(400)
//         .send(error)
//     }
//   })
// })

// ======= Listen to Port ========

app.listen(PORT,()=>{
    console.log('Running at port:', PORT)
})
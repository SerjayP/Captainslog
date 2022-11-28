const express = require("express")
const app = express()
const PORT = 3000
const reactViews = require("express-react-views")

app.set("view engine", "jsx");
app.engine("jsx", reactViews.createEngine());

app.use(express.urlencoded({ extended: false }));


// ======== New ========

app.get("/logs/new", (req, res)=>{
    res.render('New')
})

// ========= Create ========

app.post("/logs/", (req, res) => {
    if (req.body.shipIsBroken === "on"){
        req.body.shipIsBroken = true
    } else {
        req.body.shipIsBroken = false
    }
    res.send(req.body)
})

app.listen(PORT,()=>{
    console.log('Running at port:', PORT)
})
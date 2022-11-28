const mongoose = require("mongoose");

const logsSchema = new mongoose.Schema({
    Tilte: { type: String, required: true },
    Entry:  { type: String, required: true },
    shipIsBroken: { type: Boolean }
},
{
    timestamps: true
})


const Logs = mongoose.model("Logs", logsSchema);


module.exports = Logs;
const mongoose = require("mongoose");

const overSchema = new mongoose.Schema({
    Year: String,
    Sales: String,
    Profit: String,
    AOV: String,
    
});



const over = mongoose.model('overs', overSchema);

module.exports = over;
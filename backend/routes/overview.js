const router = require('express').Router();
const over = require('../models/overview');

 
router.post('/api/over', async(req, res) => {
    try {
        const newItem = new over({
            Year: req.body.year,
            Sales: req.body.sales,
            Profit: req.body.profit,
            AOV: req.body.aov,
        })
        
        const save = await newItem.save()
        
        
        console.log(newItem)
    } catch (error) {
        
        res.json(error)
    }
})

 router.get("/api/overs", async(req, res) => {
     try {
         const entries = await over.find({})
         res.status(200).json(entries);
            console.log(entries)
     } catch (error) {
         res.json(error);
     }
 })

 router.get("/api/overs/:year", async(req, res) => {
    const yr = req.params.year;
    console.log(yr);
    const item = await over.find({Year: yr})
    if(!item){
        res.status(404).json({error: 'Item not found'});
    }else{
        res.json(item);
    }
 })

module.exports = router;
const express= require('express');
const router = express.Router();
const Bid = require('../models/bid');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/add',authMiddleware , async(req,res)=>{
   try{
    const bid = new Bid(req.body );
    await bid.save();
    res.status(201).json(bid);
   }
    catch(err){
        res.status(400).json({ error: err.message });
    };
});

router.put('/:id',authMiddleware,async(req,res)=>{
    try{
        const id = req.params.id;
        const bid = req.body;
        const updateBid = await Bid.findByIdAndUpdate(id,bid,{new:true});
        res.json(bid);
    }catch(err){
        res.status(400).json({ error: err.message });
    }
})

module.exports = router;
const express = require("express");
const { v4: uuidv4 } = require("uuid");
const calculatePoints = require("./pointsCalculator");

const router = express.Router();
const receipts = new Map();

router.post("/process", (req, res) => {
    const receipt = req.body
    if (!receipt || !receipt.retailer || !receipt.items || !receipt.total || !receipt.purchaseDate || !receipt.purchaseTime) {
        return res.status(400).json({ error: "Invalid receipt format" })
    }
    const id = uuidv4()
    const points = calculatePoints(receipt)
    receipts.set(id, points)
    res.json({ id })
});

router.get("/:id/points", (req, res) => {
    const { id } = req.params
    if (!receipts.has(id)) {
        return res.status(404).json({ error: "Receipt not found" })
    }

    res.json({ points: receipts.get(id) })
});

module.exports = router;

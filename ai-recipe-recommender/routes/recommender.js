const express = require('express');
const { recommendRecipes } = require('../models/recipeModel');
const router = express.Router();

router.post('/recommend', async (req, res) => {
    const { ingredients } = req.body;
    if (!ingredients || !Array.isArray(ingredients)) {
        return res.status(400).json({ error: 'Please provide a valid list of ingredients.' });
    }
    try {
        const recipes = await recommendRecipes(ingredients);
        res.json({ recommendations: recipes });
    } catch (error) {
        console.error('Error recommending recipes:', error);
        res.status(500).json({ error: 'Failed to process your request.' });
    }
});

module.exports = router;

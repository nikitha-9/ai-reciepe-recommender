const axios = require('axios');

// Tasty API configuration
const TASTY_API_URL = 'https://tasty.p.rapidapi.com/recipes/list';
const RAPIDAPI_KEY = '23cdc384d6msh60fe3498e6731bcp1c7caajsnc3ed3a8333ae'; // Replace with your RapidAPI key
const RAPIDAPI_HOST = 'tasty.p.rapidapi.com';

// Function to fetch recipes from Tasty API
const fetchRecipesFromAPI = async (ingredients) => {
    try {
        const response = await axios.get(TASTY_API_URL, {
            params: {
                q: ingredients.join(' '), // Combine all ingredients into a search query
                from: 0,
                size: 5, // Limit results to top 5 recipes
            },
            headers: {
                'X-RapidAPI-Key': RAPIDAPI_KEY,
                'X-RapidAPI-Host': RAPIDAPI_HOST,
            },
        });

        if (response.data.results && response.data.results.length > 0) {
            return response.data.results.map(recipe => ({
                name: recipe.name,
                ingredients: recipe.sections
                    ? recipe.sections.flatMap(section => section.components.map(c => c.raw_text))
                    : 'Ingredients not available',
                instructions: recipe.instructions
                    ? recipe.instructions.map(step => step.display_text)
                    : ['Instructions not available'],
                image: recipe.thumbnail_url,
            }));
        } else {
            return [];
        }
    } catch (error) {
        console.error('Error fetching recipes from Tasty API:', error.message);
        if (error.response) {
            console.error('Response Status:', error.response.status);
            console.error('Response Data:', error.response.data);
        }
        return [];
    }
};

// Recommend Recipes based on ingredients
const recommendRecipes = async (userIngredients) => {
    if (!userIngredients || !Array.isArray(userIngredients)) {
        throw new Error('Invalid ingredients array');
    }

    const recipes = await fetchRecipesFromAPI(userIngredients);
    return recipes;
};

module.exports = { recommendRecipes };

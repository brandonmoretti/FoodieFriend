import cors from 'cors';
import express from 'express';
import { OpenAI } from 'openai'; // Import the OpenAI client directly

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json()); // Parse JSON body

// OpenAI API configuration
const openai = new OpenAI({
  apiKey: process.env.OPEN_API_KEY, // Set your OpenAI API key in environment variables
});

// Endpoint to process session data
app.post('/api/recommend', async (req, res) => {
  try {
    console.log('Request payload:', req.body);
    const { location, radius, style, budget, wildcards } = req.body;

    // Construct the prompt based on session data
    const prompt = `
      Based on the user's preferences:
      - Location: ${location}
      - Radius: ${radius} miles
      - Style: ${style} (if it's random then it can be any style/ethnicity)
      - Budget: ${budget} (if it's random then it can be any budget)
      - Wildcards: ${wildcards.join(', ')}

      Recommend a restaurant that fits these preferences and provide a short description (30-40 words max). Make sure the 
      restaurant is WITHIN the given mile radius of the location given, which may be a city, town, or neighborhood, along with the state. 
      The restaurant should also strictly be of the style given by the user's preferences, and the wild card should just help narrow down the 
      possibilities.
    `;

    // Call GPT model with the prompt
    const response = await openai.chat.completions.create({
      model: 'gpt-5.2', 
      messages: [{ role: 'user', content: prompt }],
      max_completion_tokens: 500,
    });
    console.log('GPT Response:', response);

    const recommendation = response.choices[0].message.content.trim();
    res.json({ recommendation });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to get recommendation from GPT' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
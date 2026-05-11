/**
 * Example backend API for TasteCraft recommendations
 * This shows how to set up the /api/recommendations endpoint
 */

const express = require('express');
const { OpenAI } = require('openai');

const app = express();
app.use(express.json());

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.post('/api/recommendations', async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: 'Prompt is required' });
    }

    // Call OpenAI API
    const message = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        {
          role: 'system',
          content: 'You are an elite dining curator. Return ONLY valid JSON with no markdown formatting.',
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
      temperature: 0.7,
      max_tokens: 2000,
    });

    const text = message.choices[0].message.content;

    // Validate JSON
    JSON.parse(text);

    res.json({ text });
  } catch (err) {
    console.error('API Error:', err);
    res.status(500).json({
      error: err.message || 'Failed to generate recommendations',
    });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`TasteCraft API running on port ${PORT}`);
});

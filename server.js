const express = require('express');
const Anthropic = require('@anthropic-ai/sdk');
const path = require('path');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname)));

// Initialize Anthropic client
const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Recommendations API endpoint
app.post('/api/recommendations', async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: 'Prompt is required' });
    }

    if (!process.env.ANTHROPIC_API_KEY) {
      console.error('ANTHROPIC_API_KEY is not set');
      return res.status(500).json({ 
        error: 'API configuration error: Missing Anthropic API key' 
      });
    }

    console.log('Generating recommendations with Claude...');

    // Call Anthropic Claude API
    const message = await anthropic.messages.create({
      model: 'claude-3-5-sonnet-20241022',
      max_tokens: 2048,
      messages: [
        {
          role: 'user',
          content: prompt,
        },
      ],
      system: 'You are an elite dining curator with encyclopedic knowledge of restaurants worldwide. Return ONLY valid JSON with no markdown formatting, no code blocks, no additional text.',
    });

    const text = message.content[0].type === 'text' ? message.content[0].text : '';\n\n    // Validate JSON response\n    try {\n      JSON.parse(text);\n    } catch (e) {\n      console.error('Invalid JSON from Claude:', text);\n      return res.status(500).json({ \n        error: 'Invalid response format from AI model' \n      });\n    }\n\n    res.json({ text });\n  } catch (err) {\n    console.error('API Error:', err);\n    \n    if (err.status === 401) {\n      return res.status(401).json({ error: 'Invalid Anthropic API key' });\n    }\n    if (err.status === 429) {\n      return res.status(429).json({ error: 'Rate limit exceeded. Please try again later.' });\n    }\n    \n    res.status(500).json({\n      error: err.message || 'Failed to generate recommendations',\n    });\n  }\n});\n\n// Serve the main app\napp.get('/', (req, res) => {\n  res.sendFile(path.join(__dirname, 'index.html'));\n});\n\nconst PORT = process.env.PORT || 3001;\napp.listen(PORT, () => {\n  console.log(`🍽️  TasteCraft API running on port ${PORT}`);\n  console.log(`📱 Frontend: http://localhost:${PORT}`);\n  console.log(`🏥 Health: http://localhost:${PORT}/health`);\n  console.log(`🤖 API: POST http://localhost:${PORT}/api/recommendations`);\n});\n
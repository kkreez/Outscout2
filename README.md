# TasteCraft - AI-Powered Dining Curator

An elegant, interactive web application that generates personalized restaurant recommendations based on detailed user preferences, dining history, and lifestyle.

## Features

- **Multi-Step Profiling**: Gather comprehensive dining preferences through a beautiful 4-step form
  - Step 1: Favorite cuisines & dietary requirements
  - Step 2: Dining history, favorite dishes, and budget
  - Step 3: Dining occasions and lifestyle interests
  - Step 4: Location and special context

- **AI-Powered Recommendations**: Uses AI to generate 5 highly personalized restaurant suggestions
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Rich UI Components**:
  - Cuisine selector cards with emojis
  - Multi-select pill buttons
  - Tag input for favorite places and dishes
  - Range slider for budget selection
  - Progress indicators

## Tech Stack

- **Frontend**: React 18 (via CDN with Babel)
- **Styling**: CSS Grid, Flexbox, CSS Variables
- **Backend**: Node.js/Express (API endpoint required)
- **AI Integration**: OpenAI API or similar LLM

## Setup

### Frontend
The application is a single HTML file (`index.html`) that includes React via CDN.

### Backend
You'll need to create a backend API endpoint at `/api/recommendations` that:

1. Accepts a POST request with `{ prompt: string }`
2. Calls an LLM (e.g., OpenAI's Chat API)
3. Returns `{ text: string }` containing a JSON array of 5 restaurant objects

**Example restaurant object structure:**
```json
{
  "name": "Restaurant Name",
  "cuisineType": "Cuisine type & style",
  "priceRange": "$$",
  "matchScore": 92,
  "tags": ["romantic", "natural wine", "intimate"],
  "reason": "Personal explanation...",
  "orderThis": "Signature dish"
}
```

## Running the App

1. Set up a backend server with the `/api/recommendations` endpoint
2. Serve `index.html` from your web server
3. Open in browser and start exploring!

## Customization

Edit the constant arrays to customize:
- `CUISINES` - Add more cuisine types
- `DIETARY` - Modify dietary options
- `VIBES` - Change dining occasion categories
- `SOCIAL_INTERESTS` - Add food media interests

## Architecture

### React Components
- **StepDots**: Progress indicator component
- **PillSelect**: Multi-select pill button group
- **TagInput**: Add/remove tags interface
- **Step1-4**: Form steps
- **Results**: Display recommendations
- **App**: Main application state and logic

### Styling
The app uses CSS custom properties (variables) for theming:
- `--amber`: Accent color (#d4a373)
- `--sage`: Secondary accent (#8b9d83)
- `--clay`: Tertiary color (#c97c7c)
- `--ink`: Primary text (#1a1a1a)

## Future Enhancements

- Save user profiles
- Share recommendations
- Restaurant booking integration
- Real-time restaurant data (hours, ratings, reviews)
- Map integration
- Restaurant comparison tool

## License

MIT
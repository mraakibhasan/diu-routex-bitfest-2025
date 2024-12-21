# Mofa's Kitchen Buddy

A React application for managing kitchen ingredients and discovering recipes based on your taste preferences.

## Features

- **Ingredient Management**
  - Add and track ingredients with quantities and units
  - View all saved ingredients in a organized table
  - Real-time form validation
  - Loading states and error handling

- **Recipe Suggestions**
  - Get recipe suggestions based on taste preferences
  - AI-powered recipe recommendations
  - Detailed recipe display including:
    - Preparation time
    - Cuisine type
    - Taste profile
    - Required ingredients

- **User Interface**
  - Clean and responsive design
  - Intuitive navigation
  - Loading indicators for better user experience
  - Error handling and user feedback

## Technologies Used

- **Frontend Framework**
  - React
  - React Router for navigation

- **Form Handling**
  - Formik
  - Yup for schema validation

- **State Management & Data Fetching**
  - @tanstack/react-query

- **Styling**
  - Tailwind CSS
  - React Loader Spinner for loading animations

- **API Integration**
  - Axios (via ApiInstance)

## Project Structure

```
src/
├── components/
│   ├── Ingredient.jsx    # Ingredient management component
│   ├── Recipe.jsx        # Recipe suggestion component
│   └── Welcome.jsx       # Landing page component
├── constant/
│   └── apiInstance.js    # API configuration
└── schema/
    └── IngredientSchema.js # Validation schema for ingredients
```

## Getting Started

1. **Installation**
```bash
# Clone the repository
git clone [repository-url]

# Install dependencies
npm install
```

2. **Environment Setup**
- Create a `.env` file in the root directory
- Add necessary environment variables (API endpoints, etc.)

3. **Running the Application**
```bash
npm start
```

## API Endpoints

The application expects the following API endpoints:

- `GET /ingredients/` - Fetch all ingredients
- `POST /ingredients/` - Add a new ingredient
- `POST /recipes/suggest/` - Get recipe suggestions based on preferences

## Component Features

### Ingredient Management
- Add new ingredients with name, quantity, and unit
- Real-time form validation
- Automatic refresh of ingredient list after adding
- Loading states for better UX
- Error handling and display

### Recipe Suggestions
- Select from various taste preferences:
  - Sweet
  - Sour
  - Savory
  - Spicy
  - Sweet and Tangy
  - Savory and Sweet
  - Creamy
  - Tangy
- View AI-powered recipe suggestions
- Display detailed recipe information
- Handle loading and error states

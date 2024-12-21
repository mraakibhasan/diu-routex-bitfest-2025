
# DIU RouteX Bitfest 2025 - Backend Challenge

## Overview

This repository contains the backend solution for the **DIU RouteX Bitfest 2025** competition, where the goal was to create a robust backend system for managing recipes, ingredients, and AI-based recipe suggestions.

The system includes an API for managing ingredients, creating and suggesting recipes, and using an AI model to suggest recipes based on user preferences and available ingredients.

## Project Structure

```
diu-routex-bitfest-2025/
│
├── apps/
│   ├── api/                # API Views, Serializers, and URL routing
│   ├── authkit/            # User Authentication and Registration
│   ├── base/               # Common utilities and response formats
│   └── racipe/             # Recipes and AI-based Recipe Suggestion Logic
│
├── core/                   # Core settings and configurations
├── dataset.json            # Recipe dataset
├── manage.py               # Django manage script
├── requirements.txt        # Python dependencies
└── README.md               # Project documentation
```

## API Documentation

### 1. Ingredient Management

**Route: `/ingredients`**
Method: `GET`
Description: Fetch all ingredients available in the system.
Sample Response:
```json
[
  {
    "id": 1,
    "name": "Tomato",
    "quantity": 10,
    "unit": "pieces",
    "last_updated": "2024-12-23T08:30:00"
  },
  {
    "id": 2,
    "name": "Onion",
    "quantity": 5,
    "unit": "pieces",
    "last_updated": "2024-12-23T08:30:00"
  }
]
```

**Route: `/ingredients`**
Method: `POST`
Description: Add a new ingredient to the system.
Sample Payload:
```json
{
  "name": "Garlic",
  "quantity": 50,
  "unit": "grams"
}
```

**Route: `/ingredients/{id}`**
Method: `GET`
Description: Fetch details of a specific ingredient by ID.
Sample Response:
```json
{
  "id": 1,
  "name": "Tomato",
  "quantity": 10,
  "unit": "pieces",
  "last_updated": "2024-12-23T08:30:00"
}
```

**Route: `/ingredients/{id}`**
Method: `PUT`
Description: Update the details of an existing ingredient.
Sample Payload:
```json
{
  "name": "Tomato",
  "quantity": 15,
  "unit": "pieces"
}
```

**Route: `/ingredients/{id}`**
Method: `DELETE`
Description: Delete an ingredient from the system.

### 2. Recipe Management

**Route: `/recipes`**
Method: `GET`
Description: Fetch all recipes available in the system.
Sample Response:
```json
[
  {
    "id": 1,
    "name": "Tomato Soup",
    "cuisine_type": "Indian",
    "taste_profile": "Spicy",
    "preparation_time": 30,
    "ingredients": ["Tomato", "Onion", "Garlic"],
    "instructions": "1. Boil tomatoes. 2. Prepare spice mix. 3. Serve hot."
  },
  {
    "id": 2,
    "name": "Grilled Cheese",
    "cuisine_type": "American",
    "taste_profile": "Salty",
    "preparation_time": 15,
    "ingredients": ["Bread", "Cheese", "Butter"],
    "instructions": "1. Toast bread. 2. Melt cheese between bread slices. 3. Serve."
  }
]
```

**Route: `/recipes`**
Method: `POST`
Description: Add a new recipe to the system.
Sample Payload:
```json
{
  "name": "Pasta",
  "cuisine_type": "Italian",
  "taste_profile": "Savory",
  "preparation_time": 20,
  "ingredients": ["Pasta", "Tomato Sauce", "Cheese"],
  "instructions": "1. Cook pasta. 2. Add sauce and cheese. 3. Serve hot."
}
```

### 3. Recipe Suggestion API (AI Integration)

**Route: `/recipe-suggestion`**
Method: `POST`
Description: Suggest a recipe based on the user's preference and the ingredients available in the system. The AI model suggests recipes using these inputs.
Sample Payload:
```json
{
  "preference": "spicy"
}
```

Sample Response:
```json
{
  "ai_suggestion": "Try a spicy pasta with chili flakes and spicy sauce.",
  "matching_recipes": [
    {
      "id": 1,
      "name": "Spicy Pasta",
      "cuisine_type": "Italian",
      "taste_profile": "Spicy",
      "preparation_time": 20,
      "ingredients": ["Pasta", "Chili Flakes", "Tomato Sauce"],
      "instructions": "1. Boil pasta. 2. Add chili flakes and sauce. 3. Serve."
    }
  ]
}
```

Response (No Matching Recipes):
```json
{
  "message": "No recipes found for the preference 'spicy' with the available ingredients. Please check your stock or try a different preference.",
  "ai_suggestion": "Try a spicy pasta with chili flakes and spicy sauce.",
  "matching_recipes": []
}
```

### 4. Ingredient Inventory Update

**Route: `/update-inventory`**
Method: `POST`
Description: Update the inventory for multiple ingredients at once.
Sample Payload:
```json
{
  "ingredients": [
    {
      "name": "Tomato",
      "quantity": 20,
      "unit": "pieces"
    },
    {
      "name": "Garlic",
      "quantity": 50,
      "unit": "grams"
    }
  ]
}
```

---

## AI Model Integration

This project integrates the **T5-small model** from Hugging Face to generate recipe suggestions based on user preferences and available ingredients. The model is used to dynamically suggest recipes by inputting a prompt that describes the user preference and the ingredients.

- **Model**: T5-small
- **Library**: `transformers`
- **Usage**: The `RecipeAI` class is responsible for processing the user input, generating a prompt for the AI model, and decoding the response.

### How AI works:
- The AI model generates suggestions based on the format:
  ```
  Suggest a recipe that is {preference} using these ingredients: {ingredient1}, {ingredient2}, ...
  ```

## Installation & Setup

### Prerequisites:
- Python 3.8 or higher
- Django 4.x
- Django Rest Framework
- transformers library for AI model integration

### Steps to Run:

1. Clone the repository:
   ```bash
   git clone https://github.com/mraakibhasan/diu-routex-bitfest-2025.git
   cd diu-routex-bitfest-2025
   ```

2. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

3. Run migrations:
   ```bash
   python manage.py migrate
   ```

4. Start the Django development server:
   ```bash
   python manage.py runserver
   ```

5. Access the API at `http://127.0.0.1:8000`.

## Future Improvements

While the current system provides a solid foundation, there are a few enhancements that could improve functionality, scalability, and user experience:

1. **Ingredient Inventory Management:**
   - Implement an advanced inventory management system that allows users to track ingredient usage over time and automatically restock low quantities. This would involve integrating with external APIs for real-time stock data or supplier inventories.
   
2. **Recipe Personalization:**
   - Develop an AI-powered recommendation system that learns user preferences over time, providing more accurate and tailored recipe suggestions based on past behavior and preferences.
   
3. **Integration with External APIs:**
   - Extend the system to integrate with popular recipe APIs like Spoonacular or Edamam to pull recipes from external databases, increasing the variety of available suggestions.
   
4. **Recipe Rating & Feedback:**
   - Add a feature that allows users to rate recipes, submit reviews, and save their favorites. This could also influence future recipe recommendations based on ratings and reviews.
   
5. **Advanced User Authentication:**
   - Introduce multi-factor authentication (MFA) to enhance security for user accounts. Additionally, integration with OAuth services such as Google or Facebook could simplify user sign-up and login processes.
   
6. **Meal Planning Feature:**
   - Add a meal planning feature where users can create weekly or monthly meal plans, automatically adding the necessary ingredients to their shopping lists based on their chosen recipes.
   
7. **Cross-Platform Mobile Application:**
   - Create a mobile application for iOS and Android that can sync with the backend, providing users with a seamless experience for searching recipes, managing ingredients, and planning meals.
   
8. **Performance Optimization:**
   - Improve the performance of the AI model by fine-tuning it on a larger dataset specific to recipe suggestions. This will allow the model to make even more accurate and personalized suggestions.
   
9. **Real-Time Collaborative Cooking:**
   - Allow users to collaborate in real-time on recipe creation or cooking sessions. Multiple users could add ingredients, share instructions, or adjust preferences in a shared recipe.

10. **Advanced Search Functionality:**
    - Enhance the search functionality to support more advanced queries, such as filtering recipes based on dietary restrictions (e.g., vegan, gluten-free), prep time, difficulty level, or cuisine type.

11. **Integrate with Smart Kitchen Devices:**
    - Add integration with smart kitchen devices (e.g., smart ovens, fridges, or cooking assistants) to automate cooking steps or suggest recipes based on the ingredients currently available in the user’s kitchen.

12. **AI-Powered Image Recognition:**
    - Implement image recognition for identifying ingredients. Users could take a photo of their available ingredients, and the system would automatically suggest recipes based on that image.

13. **Localization and Multi-language Support:**
    - Expand the system to support multiple languages and regions, allowing users from different parts of the world to access recipes and suggestions tailored to their language and cultural preferences.

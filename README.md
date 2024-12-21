
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

## Hosting the Model

The AI model (T5-small) is hosted on [Hugging Face](https://huggingface.co/) for online inference. You can also train and deploy the model locally using Git LFS if Hugging Face hosting is not available.

## Contribution

Contributions to the project are welcome! Please follow these steps:

1. Fork the repository.
2. Create a new branch for your changes.
3. Commit your changes.
4. Push the changes to your forked repository.
5. Submit a pull request to the main repository.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
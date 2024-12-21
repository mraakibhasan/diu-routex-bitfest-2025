import json
from django.conf import settings
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import get_object_or_404
from .models import Ingredient, Recipe
from .serializers import IngredientSerializer, RecipeSerializer
from .ai import RecipeAI
from django.db.models import Q

class IngredientListCreateAPIView(APIView):
    def get(self, request):
        ingredients = Ingredient.objects.all()
        serializer = IngredientSerializer(ingredients, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = IngredientSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class IngredientDetailAPIView(APIView):
    def get(self, request, pk):
        ingredient = get_object_or_404(Ingredient, pk=pk)
        serializer = IngredientSerializer(ingredient)
        return Response(serializer.data)

    def put(self, request, pk):
        ingredient = get_object_or_404(Ingredient, pk=pk)
        serializer = IngredientSerializer(ingredient, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        ingredient = get_object_or_404(Ingredient, pk=pk)
        ingredient.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

class IngredientUpdateInventoryAPIView(APIView):
    def post(self, request):
        ingredients = request.data.get('ingredients', [])
        updated = []
        for ing_data in ingredients:
            ingredient, created = Ingredient.objects.update_or_create(
                name=ing_data['name'],
                defaults={
                    'quantity': ing_data['quantity'],
                    'unit': ing_data['unit']
                }
            )
            updated.append(IngredientSerializer(ingredient).data)
        return Response(updated)

class RecipeSuggestionAPIView(APIView):
    recipe_ai = RecipeAI()

    def post(self, request):
        preference = request.data.get('preference', '')

        available_ingredients = Ingredient.objects.filter(quantity__gt=0).values_list('name', flat=True)

        ai_suggestion = self.recipe_ai.generate_suggestion(preference, available_ingredients)

        matching_recipes = []
        with open('dataset.json', 'r') as f:
            data = json.load(f)
            for recipe in data:
                recipe_ingredients = set(recipe['ingredients'])
                
                if recipe_ingredients.issubset(set(available_ingredients)):
                    if preference.lower() in recipe['taste_profile'].lower() or preference.lower() in recipe['cuisine_type'].lower():
                        matching_recipes.append(recipe)

        if not matching_recipes:
            return Response({
                'message': f"No recipes found for the preference '{preference}' with the available ingredients. Please check your stock or try a different preference.",
                'ai_suggestion': ai_suggestion,
                'matching_recipes': []
            })

        return Response({
            'ai_suggestion': ai_suggestion,
            'matching_recipes': matching_recipes
        })
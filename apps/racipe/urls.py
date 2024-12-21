# apps/recipe/urls.py
from django.urls import path
from .views import (
    IngredientListCreateAPIView,
    IngredientDetailAPIView,
    IngredientUpdateInventoryAPIView,
    RecipeSuggestionAPIView
)

urlpatterns = [
    # Ingredient URLs
    path('ingredients/', IngredientListCreateAPIView.as_view(), name='ingredient-list-create'),
    path('ingredients/<int:pk>/', IngredientDetailAPIView.as_view(), name='ingredient-detail'),
    path('ingredients/update-inventory/', IngredientUpdateInventoryAPIView.as_view(), name='ingredient-update-inventory'),
    
    # Recipe URLs
    path('recipes/suggest/', RecipeSuggestionAPIView.as_view(), name='recipe-suggest'),
]
import React, { useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useMutation } from "@tanstack/react-query";
import ApiInstance from "@/constant/apiInstance";
import { Rings } from 'react-loader-spinner';

const RecipeSuggestionSchema = Yup.object().shape({
  preference: Yup.string().oneOf(
    [
      "sweet", 
      "sour", 
      "savory", 
      "spicy", 
      "sweet and tangy", 
      "savory and sweet", 
      "creamy", 
      "tangy"
    ], 
    "Invalid taste preference"
  ).required("Please select a taste preference"),
});

const RecipeSuggestion = () => {
  const [suggestedRecipes, setSuggestedRecipes] = useState([]);
  const [aiSuggestion, setAiSuggestion] = useState("");

  const { mutate: getRecipeSuggestions, isPending, isError, error } = useMutation({
    mutationFn: async (preference) => {
      const response = await ApiInstance.post("/recipes/suggest/", { preference });
      return response.data;
    },
    onSuccess: (data) => {
      setSuggestedRecipes(data.matching_recipes);
      setAiSuggestion(data.ai_suggestion);
    },
    onError: (err) => {
      console.error("Error fetching recipes:", err);
    },
  });

  const handleSubmit = (values, actions) => {
    getRecipeSuggestions(values.preference);
    actions.setSubmitting(false);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 sm:px-4 lg:px-6">
      <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
        <h2 className="text-2xl font-semibold text-center mb-4">Recipe Suggestion</h2>
        
        <Formik
          initialValues={{ preference: "sweet" }}
          validationSchema={RecipeSuggestionSchema}
          onSubmit={handleSubmit}
        >
          <Form>
            <div className="space-y-4">
              <div>
                <label className="block font-medium">Taste Preference</label>
                <Field as="select" name="preference" className="mt-1 block w-full border border-gray-300 rounded-md p-2">
                  <option value="sweet">Sweet</option>
                  <option value="sour">Sour</option>
                  <option value="savory">Savory</option>
                  <option value="spicy">Spicy</option>
                  <option value="sweet and tangy">Sweet and Tangy</option>
                  <option value="savory and sweet">Savory and Sweet</option>
                  <option value="creamy">Creamy</option>
                  <option value="tangy">Tangy</option>
                </Field>
                <ErrorMessage name="preference" component="div" className="text-red-500 text-sm" />
              </div>

              <div className="mt-6">
                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white p-3 rounded-lg font-medium hover:bg-blue-700 disabled:bg-blue-300"
                  disabled={isPending}
                >
                  {isPending ? (
                    <div className="flex justify-center items-center">
                      <Rings color="#fff" height={24} width={24} />
                    </div>
                  ) : (
                    "Get Recipe Suggestions"
                  )}
                </button>
              </div>
            </div>
          </Form>
        </Formik>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-center mb-4">Suggested Recipes</h2>

        {isPending && (
          <div className="flex justify-center items-center space-x-2">
            <Rings color="#00f" height={40} width={40} />
            <p className="text-gray-600">Loading recipes...</p>
          </div>
        )}

        {isError && <div className="text-center text-red-500">{error.message}</div>}

        {aiSuggestion && !isPending && !isError && (
          <div className="bg-yellow-100 p-4 rounded-md mb-4">
            <h3 className="font-semibold">AI Suggestion:</h3>
            <p>{aiSuggestion}</p>
          </div>
        )}

        <div>
          {suggestedRecipes.length === 0 && !isPending ? (
            <div className="text-center text-gray-500">No recipes found. Try another preference.</div>
          ) : (
            <ul className="space-y-4">
              {suggestedRecipes.map((recipe) => (
                <li key={recipe.id} className="p-4 border rounded-md shadow-sm hover:bg-gray-100">
                  <h3 className="text-xl font-semibold">{recipe.name}</h3>
                  <p className="text-sm text-gray-600">Taste: {recipe.taste_profile}</p>
                  <p className="text-sm text-gray-600">Cuisine: {recipe.cuisine_type}</p>
                  <p className="text-sm text-gray-600">Preparation Time: {recipe.preparation_time}</p>
                  <div className="mt-2">
                    <strong>Ingredients:</strong>
                    <ul className="list-disc pl-5">
                      {recipe.ingredients.map((ingredient, index) => (
                        <li key={index} className="text-sm text-gray-600">{ingredient}</li>
                      ))}
                    </ul>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default RecipeSuggestion;

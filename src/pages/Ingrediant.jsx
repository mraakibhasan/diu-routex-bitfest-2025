import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import IngrediantSchema from "./schema/IngridientSchema";
import { useQuery, useMutation } from "@tanstack/react-query";
import ApiInstance from "@/constant/apiInstance";
import { Rings } from 'react-loader-spinner';

// Ingredient Management Component
const IngredientManagement = () => {
  // Fetch ingredients using react-query
  const { data: ingredients, isPending, isError, error, refetch } = useQuery({
    queryKey: ["ingredients"],
    queryFn: async () => {
      const response = await ApiInstance.get("/ingredients/");
      return response.data;
    },
  });

  // Use useMutation for handling the POST request (Adding new ingredient)
  const { mutate: addIngredient, isPending: isAdding, isError: addError, error: addMutationError } = useMutation({
    mutationFn: async (ingredientData) => {
      const response = await ApiInstance.post("/ingredients/", ingredientData);
      return response.data;
    },
    onSuccess: () => {
      // Refetch the ingredients list after adding new one
      refetch();
    },
    onError: (err) => {
      console.error("Error adding ingredient:", err);
    },
  });

  // Handle Add Ingredient form submission
  const handleAddIngredient = (values, actions) => {
    addIngredient(values); // Trigger mutation
    actions.resetForm(); // Reset the form after submission
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Ingredient Form */}
      <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
        <h2 className="text-2xl font-semibold text-center mb-4">Add New Ingredient</h2>
        <Formik
          initialValues={{
            name: "",
            quantity: "",
            unit: "",
          }}
          validationSchema={IngrediantSchema}
          onSubmit={handleAddIngredient}
        >
          <Form>
            <div className="space-y-4">
              {/* Ingredient Name */}
              <div>
                <label className="block font-medium">Ingredient Name</label>
                <Field
                  type="text"
                  name="name"
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                  placeholder="Enter ingredient name"
                />
                <ErrorMessage
                  name="name"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              {/* Quantity */}
              <div>
                <label className="block font-medium">Quantity</label>
                <Field
                  type="number"
                  name="quantity"
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                  placeholder="Enter quantity"
                />
                <ErrorMessage
                  name="quantity"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              {/* Unit */}
              <div>
                <label className="block font-medium">Unit</label>
                <Field
                  type="text"
                  name="unit"
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                  placeholder="e.g., g, kg, ml"
                />
                <ErrorMessage
                  name="unit"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              <div className="mt-6">
                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white p-3 rounded-lg font-medium hover:bg-blue-700"
                  disabled={isAdding} // Disable button while adding
                >
                  {isAdding ? (
                    <div className="flex justify-center items-center">
                      <Rings color="#fff" height={24} width={24} />
                    </div>
                  ) : (
                    "Add Ingredient"
                  )}
                </button>
              </div>
            </div>
          </Form>
        </Formik>
      </div>

      {/* Ingredient List */}
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-center mb-4">Saved Ingredients</h2>
        
        {/* Handle Loading and Error states */}
        {isPending ? (
          <div className="flex justify-center items-center space-x-2">
            <Rings color="#00f" height={40} width={40} />
            <p className="text-gray-600">Loading ingredients...</p>
          </div>
        ) : isError ? (
          <div className="text-center text-red-500">{error.message}</div>
        ) : (
          <table className="w-full table-auto border-collapse">
            <thead>
              <tr className="border-b">
                <th className="px-4 py-2 text-left">Name</th>
                <th className="px-4 py-2 text-left">Quantity</th>
                <th className="px-4 py-2 text-left">Unit</th>
              </tr>
            </thead>
            <tbody>
              {ingredients.map((ingredient) => (
                <tr key={ingredient.id} className="border-b hover:bg-gray-100">
                  <td className="px-4 py-2">{ingredient.name}</td>
                  <td className="px-4 py-2">{ingredient.quantity}</td>
                  <td className="px-4 py-2">{ingredient.unit}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        
        {/* Handle mutation error */}
        {addError && <div className="text-red-500">{addMutationError.message}</div>}
      </div>
    </div>
  );
};

export default IngredientManagement;

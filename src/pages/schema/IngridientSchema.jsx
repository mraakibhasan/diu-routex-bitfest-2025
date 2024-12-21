import * as Yup from "yup"; 


const IngrediantSchema = Yup.object({
    name: Yup.string().required("Ingredient name is required"),
    quantity: Yup.number().required("Quantity is required").positive("Quantity must be positive"),
    unit: Yup.string().required("Unit is required"),
  });

export default IngrediantSchema;
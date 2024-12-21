from transformers import T5Tokenizer, T5ForConditionalGeneration
import torch

class RecipeAI:
    def __init__(self):
        self.model_name = "t5-small"
        self.tokenizer = T5Tokenizer.from_pretrained(self.model_name)
        self.model = T5ForConditionalGeneration.from_pretrained(self.model_name)

    def generate_suggestion(self, preference, available_ingredients):
        prompt = f"Suggest a recipe that is {preference} using these ingredients: {', '.join(available_ingredients)}"
        inputs = self.tokenizer(prompt, return_tensors="pt", max_length=512, truncation=True)
        outputs = self.model.generate(
            inputs.input_ids,
            max_length=150,
            num_beams=4,
            temperature=0.7,
            no_repeat_ngram_size=2
        )
        return self.tokenizer.decode(outputs[0], skip_special_tokens=True)
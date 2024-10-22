import { HfInference } from "@huggingface/inference";
import dotenv from 'dotenv';

dotenv.config();

const hf = new HfInference(process.env.HUGGINGFACE_API_KEY);

export async function handleAIResponse(message) {
    console.log("Received message:", message.content);

    if (message.mentions.has(message.client.user)) {
      const userMessage = message.content.replace(`<@!${message.client.user.id}>`, '').trim();

      let aiResponse;

      try {
        const response = await hf.textGeneration({
          model: "gpt2",
          inputs: userMessage,
        });

        aiResponse = response.generated_text.trim();
      } catch (error) {
        console.error("Error in AI response:", error);
        aiResponse = "I'm having trouble thinking right now. Can you try again later?";
      }

      message.reply(aiResponse);
    }
  }

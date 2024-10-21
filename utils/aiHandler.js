import OpenAI from 'openai';
import dotenv from 'dotenv';

dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function handleAIResponse(message) {
  try {
    const response = await openai.completions.create({
      model: "text-davinci-002",
      prompt: `The following is a conversation with an AI assistant for a Call of Duty Mobile clan Discord server. The assistant is helpful, creative, clever, and very friendly.\n\nHuman: ${message.content}\n\nAI:`,
      temperature: 0.9,
      max_tokens: 150,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0.6,
      stop: ["\n", " Human:", " AI:"],
    });

    let aiResponse = response.choices[0].text.trim();

    // Occasionally add a CODM reference
    if (Math.random() < 0.3) {
      const codmReferences = [
        "By the way, have you played any CODM matches today?",
        "Speaking of which, what's your favorite loadout in CODM?",
        "That reminds me, our clan war is starting soon. Are you ready for some intense CODM action?",
        "Just like in CODM, teamwork makes the dream work!",
        "You know, this conversation is as exciting as a close CODM match!"
      ];
      aiResponse += " " + codmReferences[Math.floor(Math.random() * codmReferences.length)];
    }

    message.reply(aiResponse);
  } catch (error) {
    console.error("Error in AI response:", error);
    message.reply("I'm sorry, I'm having trouble thinking right now. Can you try again later?");
  }
}

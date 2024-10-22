import fetch from 'node-fetch';
import dotenv from 'dotenv';

dotenv.config();

const HUGGINGFACE_API_URL = 'https://api-inference.huggingface.co/models/facebook/blenderbot-400M-distill';

// Function to query the Hugging Face API
async function query(payload) {
  const response = await fetch(HUGGINGFACE_API_URL, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.HUGGINGFACE_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  // Debugging: Log the status of the API response
  console.log(`API Status: ${response.status} ${response.statusText}`);

  if (!response.ok) {
    const errorDetails = await response.text();
    throw new Error(`Error in API response: ${response.status} ${response.statusText} - ${errorDetails}`);
  }

  return await response.json();
}

// Array of CODM references including loadout suggestions
const codmReferences = [
  "Have you played any CODM matches today?",
  "What's your favorite loadout in CODM?",
  "Our clan war is starting soon. Are you ready for some intense CODM action?",
  "Just like in CODM, teamwork makes the dream work!",
  "This conversation is as exciting as a close CODM match!",

  // Loadout suggestions
  "Try the M4 assault rifle with OWC Marksman, No Stock, OWC Laser - Tactical, 50 Round Extended Mag, and Granulated Grip Tape for a balanced build.",
  "Looking for a quick SMG? Try the QQ9 with Monolithic Suppressor, RTC Recon Tac Long, No Stock, 45 Round Extended Mag, and OWC Laser - Tactical for aggressive play.",
  "For sniper enthusiasts, the DL Q33 is a beast with MIP Light, YKM Combat Stock, OWC Skeleton, OWC Laser - Tactical, and FMJ for high damage at long range.",
  "If you prefer LMGs, the RPD with MIP Light Barrel, No Stock, OWC Laser - Tactical, 100 Round Reload, and Granulated Grip Tape will give you sustained firepower.",
  "Try an aggressive run-and-gun build with the AS VAL: MIP Quick Barrel, RTC Laser 1mW, 30 Round Fast Reload, Stippled Grip Tape, and No Stock.",

  // Tactical tips
  "For tight maps like Nuketown, consider using SMGs or shotguns for close-range combat domination.",
  "For longer maps like Crossfire, a sniper loadout can help you hold key positions and control sightlines.",
  "Looking to improve? CODM is all about movement—slide canceling, jump shots, and proper positioning are key to outplaying opponents.",
  "Don't forget to adjust your sensitivity for better aim control—especially when switching between different weapons like SMGs and snipers.",
  "Communication with your team is just as important as your loadout. Keep your squad in sync for the win!",
];

// Function to handle AI responses to user messages
export async function handleAIResponse(message) {
  try {
    // Extract the part of the message mentioning the bot
    const mentionIndex = message.content.indexOf(message.client.user.toString());
    let userMessage = message.content;

    if (mentionIndex !== -1) {
      userMessage = message.content.slice(mentionIndex + message.client.user.toString().length).trim();
    }

    // If the user message is empty after trimming, provide a default message
    if (!userMessage) {
      userMessage = "Hello!";
    }

    // Call the Hugging Face API with the user message
    const response = await query({ "inputs": userMessage });

    // Ensure the response has the expected structure
    if (response && Array.isArray(response) && response[0] && response[0].generated_text) {
      let aiResponse = response[0].generated_text;

      // Randomly include a CODM reference (30% chance)
      if (Math.random() < 0.3) {
        aiResponse += " " + codmReferences[Math.floor(Math.random() * codmReferences.length)];
      }

      // Send the AI's reply to the user
      message.reply(aiResponse);
    } else {
      throw new Error("Unexpected API response format.");
    }

  } catch (error) {
    // Log and reply with a generic error message if something goes wrong
    console.error("Error in AI response:", error.message || error);
    message.reply("I'm sorry, I'm having trouble thinking right now. Can you try again later?");
  }
}

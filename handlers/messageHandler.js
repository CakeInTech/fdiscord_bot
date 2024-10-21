import { handleCommand } from '../commands/commandHandler.js';
import { checkForCurses } from '../utils/curseDetection.js';
import { handleAIResponse } from '../utils/aiHandler.js';

export async function handleMessage(message) {
  if (message.author.bot) return;

  // Check for curses
  await checkForCurses(message);

  // Handle commands
  if (message.content.startsWith('!')) {
    await handleCommand(message);
    return;
  }

  // Handle AI responses when bot is mentioned
  if (message.mentions.has(message.client.user)) {
    await handleAIResponse(message);
  }
}

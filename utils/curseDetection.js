import { addWarning, getWarnings } from './dataManager.js';

const curseWords = [
  'fuck', 'shit', 'asshole', 'bitch', 'damn', 'bastard', 'cunt', 'dick', 'piss', 'whore'
];

export async function checkForCurses(message) {
  const content = message.content.toLowerCase();
  const foundCurses = curseWords.filter(word => content.includes(word));

  if (foundCurses.length > 0) {
    const warnings = getWarnings(message.author.id);
    addWarning(message.author.id, `Used curse word(s): ${foundCurses.join(', ')}`, message.client.user.id);

    await message.reply(`Warning: Please refrain from using inappropriate language. This is warning ${warnings.length + 1}/3.`);

    if (warnings.length + 1 >= 3) {
      try {
        await message.member.timeout(3 * 60 * 60 * 1000, 'Received 3 warnings for using inappropriate language');
        message.channel.send(`${message.author} has been muted for 3 hours due to receiving 3 warnings.`);
      } catch (error) {
        console.error("Error muting user:", error);
        message.channel.send("There was an error muting the user. Please contact an administrator.");
      }
    }
  }
}

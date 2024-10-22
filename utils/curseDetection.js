import { addWarning, getWarnings } from './dataManager.js';

const curseWords = [
  'fuck', 'shit', 'asshole', 'bitch', 'damn', 'bastard', 'cunt', 'dick', 'piss', 'whore'
];

export async function checkForCurses(message) {
  const content = message.content.toLowerCase();
  const foundCurses = curseWords.filter(word => content.includes(word));

  if (foundCurses.length > 0) {
    try {
      // Delete the offensive message
      await message.delete();
      console.log(`Deleted message containing offensive words from ${message.author.tag}`);

      const warnings = getWarnings(message.author.id);
      addWarning(message.author.id, `Used curse word(s): ${foundCurses.join(', ')}`, message.client.user.id);

      const warningMessage = await message.channel.send(`${message.author}, warning: Please refrain from using inappropriate language. This is warning ${warnings.length + 1}/3.`);

      // Delete the warning message after 5 seconds
      setTimeout(() => warningMessage.delete().catch(console.error), 5000);

      if (warnings.length + 1 >= 3) {
        try {
          await message.member.timeout(3 * 60 * 60 * 1000, 'Received 3 warnings for using inappropriate language');
          const muteMessage = await message.channel.send(`${message.author} has been muted for 3 hours due to receiving 3 warnings.`);

          // Delete the mute notification after 10 seconds
          setTimeout(() => muteMessage.delete().catch(console.error), 10000);
        } catch (error) {
          console.error("Error muting user:", error);
          message.channel.send("There was an error muting the user. Please contact an administrator.");
        }
      }
    } catch (error) {
      console.error("Error handling curse word:", error);
    }
  }
}

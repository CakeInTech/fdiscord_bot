import { PermissionsBitField } from 'discord.js';
import { addMute } from '../../utils/dataManager.js';

export async function mute(message, args) {
  if (!message.member.permissions.has(PermissionsBitField.Flags.ModerateMembers)) {
    return message.reply("You don't have permission to use this command.");
  }

  const user = message.mentions.users.first();
  if (!user) {
    return message.reply("Please mention a user to mute.");
  }

  const duration = args[1] ? parseInt(args[1]) * 60 * 1000 : 3 * 60 * 60 * 1000; // Default to 3 hours
  const reason = args.slice(2).join(' ') || 'No reason provided';

  try {
    const member = await message.guild.members.fetch(user);
    await member.timeout(duration, reason);
    addMute(user.id, duration, reason, message.author.id);
    message.channel.send(`${user.tag} has been muted for ${duration / (60 * 1000)} minutes. Reason: ${reason}`);
  } catch (error) {
    console.error(error);
    message.channel.send("There was an error muting the user.");
  }
}

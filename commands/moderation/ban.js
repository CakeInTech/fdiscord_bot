import { PermissionsBitField } from 'discord.js';
import { addBan } from '../../utils/dataManager.js';

export async function ban(message, args) {
  if (!message.member.permissions.has(PermissionsBitField.Flags.BanMembers)) {
    return message.reply("You don't have permission to use this command.");
  }

  const user = message.mentions.users.first();
  if (!user) {
    return message.reply("Please mention a user to ban.");
  }

  const reason = args.slice(1).join(' ') || 'No reason provided';

  try {
    await message.guild.members.ban(user, { reason });
    addBan(user.id, reason, message.author.id);
    message.channel.send(`${user.tag} has been banned. Reason: ${reason}`);
  } catch (error) {
    console.error(error);
    message.channel.send("There was an error banning the user.");
  }
}

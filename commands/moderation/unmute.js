import { PermissionsBitField } from 'discord.js';

export async function unmute(message, args) {
  if (!message.member.permissions.has(PermissionsBitField.Flags.ModerateMembers)) {
    return message.reply("You don't have permission to use this command.");
  }

  const user = message.mentions.users.first();
  if (!user) {
    return message.reply("Please mention a user to unmute.");
  }

  try {
    const member = await message.guild.members.fetch(user);
    await member.timeout(null);
    message.channel.send(`${user.tag} has been unmuted.`);
  } catch (error) {
    console.error(error);
    message.channel.send("There was an error unmuting the user.");
  }
}

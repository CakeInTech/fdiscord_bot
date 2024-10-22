import { PermissionsBitField } from 'discord.js';

export async function purge(message, args) {
  if (!message.member.permissions.has(PermissionsBitField.Flags.ManageMessages)) {
    return message.reply("You don't have permission to use this command.");
  }

  const amount = parseInt(args[0]) || 10;
  if (isNaN(amount) || amount < 1 || amount > 100) {
    return message.reply('Please provide a number between 1 and 100 for the number of messages to delete.');
  }

  try {
    const fetched = await message.channel.messages.fetch({ limit: amount + 1 });
    await message.channel.bulkDelete(fetched, true);
    const confirmationMsg = await message.channel.send(`Successfully deleted ${amount} messages.`);

    // Delete the confirmation message after 5 seconds
    setTimeout(() => confirmationMsg.delete(), 5000);
  } catch (error) {
    console.error('Error purging messages:', error);
    message.reply('There was an error trying to purge messages in this channel!');
  }
}

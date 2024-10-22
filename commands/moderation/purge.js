import { PermissionsBitField } from 'discord.js';

export async function purge(message, args) {
  // Check for ManageMessages permission
  if (!message.member.permissions.has(PermissionsBitField.Flags.ManageMessages)) {
    return message.reply("You don't have permission to use this command.");
  }

  // Parse the number of messages to delete
  const amount = parseInt(args[0]) || 10;
  if (isNaN(amount) || amount < 1 || amount > 100) {
    return message.reply('Please provide a number between 1 and 100 for the number of messages to delete.');
  }

  try {
    // Fetch messages in the channel
    const fetched = await message.channel.messages.fetch({ limit: amount + 1 });

    // If there are fewer messages than requested, inform the user
    if (fetched.size <= 1) {
      return message.reply('There are no messages to delete or not enough messages available.');
    }

    // Bulk delete messages
    await message.channel.bulkDelete(fetched, true);

    // Send confirmation
    const confirmationMsg = await message.channel.send(`Successfully deleted ${fetched.size - 1} messages.`);

    // Delete the confirmation message after 5 seconds
    setTimeout(() => confirmationMsg.delete(), 5000);
  } catch (error) {
    // Handle errors like trying to delete messages older than 14 days
    if (error.code === 10008) {
      message.reply('Some of the messages could not be deleted, likely because they are too old.');
    } else {
      console.error('Error purging messages:', error);
      message.reply('There was an error trying to purge messages in this channel!');
    }
  }
}

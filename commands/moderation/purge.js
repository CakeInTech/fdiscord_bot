import { PermissionsBitField } from 'discord.js';

export async function purge(message, args) {
  if (!message.member.permissions.has(PermissionsBitField.Flags.ManageMessages)) {
    return message.reply("Who are you to command me ?");
  }

  const amount = parseInt(args[0]) || 10;
  if (isNaN(amount) || amount < 1 || amount > 100) {
    return message.reply('Please provide a number between 1 and 100 for the number of messages to delete.');
  }

  try {
    const fetched = await message.channel.messages.fetch({ limit: amount + 1 });

    if (fetched.size <= 1) {
      return message.reply('There are no messages to delete or not enough messages available.');
    }

    await message.channel.bulkDelete(fetched, true);

    const confirmationMsg = await message.channel.send(`Successfully deleted ${fetched.size - 1} messages.`);

    setTimeout(() => confirmationMsg.delete(), 5000);
  } catch (error) {
    if (error.code === 10008) {
      message.reply('Some of the messages could not be deleted, likely because they are too old.');
    } else {
      console.error('Error purging messages:', error);
      message.reply('There was an error trying to purge messages in this channel!');
    }
  }
}

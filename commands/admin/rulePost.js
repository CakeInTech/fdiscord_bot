import { PermissionsBitField } from 'discord.js';

export async function rulePost(message, args) {
  if (!message.member.permissions.has(PermissionsBitField.Flags.ManageGuild)) {
    return message.reply("You don't have permission to use this command.");
  }

  const channelMention = args.shift();
  if (!channelMention) {
    return message.reply("Please specify a channel to post the message.");
  }

  const channelId = channelMention.replace(/[<#>]/g, '');
  const channel = message.guild.channels.cache.get(channelId);

  if (!channel) {
    return message.reply("Invalid channel specified.");
  }

  const content = args.join(' ');
  if (!content) {
    return message.reply("Please provide a message to post.");
  }

  try {
    await channel.send(content);
    message.reply(`Message posted successfully in ${channel}.`);
  } catch (error) {
    console.error(error);
    message.reply("There was an error posting the message.");
  }
}

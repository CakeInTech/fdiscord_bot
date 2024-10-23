import { PermissionsBitField, EmbedBuilder } from 'discord.js';

export async function rulePost(message) {
  if (!message.member.permissions.has(PermissionsBitField.Flags.ManageGuild)) {
    return message.reply("You don't have permission to use this command.");
  }

  await message.reply("Please mention the channel where you want to post the rule:");

  const filter = response => response.author.id === message.author.id;
  const channelCollector = await message.channel.awaitMessages({ filter, max: 1, time: 30000 });

  if (!channelCollector.size) {
    return message.reply("You did not provide a channel in time.");
  }

  const channelMention = channelCollector.first().content;
  const channelId = channelMention.replace(/[<#>]/g, '');
  const channel = message.guild.channels.cache.get(channelId);

  if (!channel) {
    return message.reply("Invalid channel specified.");
  }

  await message.reply("Please provide the title for the rule message:");

  const titleCollector = await message.channel.awaitMessages({ filter, max: 1, time: 30000 });

  if (!titleCollector.size) {
    return message.reply("You did not provide a title in time.");
  }

  const title = titleCollector.first().content;

  await message.reply("Please provide the body of the rule message:");

  const bodyCollector = await message.channel.awaitMessages({ filter, max: 1, time: 30000 });

  if (!bodyCollector.size) {
    return message.reply("You did not provide the message body in time.");
  }

  const messageContent = bodyCollector.first().content;

  await message.reply("Please provide the footer for the message:");

  const footerCollector = await message.channel.awaitMessages({ filter, max: 1, time: 30000 });

  if (!footerCollector.size) {
    return message.reply("You did not provide the footer in time.");
  }

  const footer = footerCollector.first().content;
  await message.reply("You can optionally provide a color in hex format (e.g., #FF0000), or type 'skip' to use the default color:");

  const colorCollector = await message.channel.awaitMessages({ filter, max: 1, time: 30000 });
  const color = colorCollector.size && colorCollector.first().content.toLowerCase() !== 'skip'
    ? colorCollector.first().content.trim()
    : '#0099ff'; 
  await message.reply("You can optionally provide a thumbnail URL or type 'skip':");

  const thumbnailCollector = await message.channel.awaitMessages({ filter, max: 1, time: 30000 });
  const thumbnail = thumbnailCollector.size && thumbnailCollector.first().content.toLowerCase() !== 'skip'
    ? thumbnailCollector.first().content.trim()
    : null;

  await message.reply("You can optionally provide an image URL or type 'skip':");

  const imageCollector = await message.channel.awaitMessages({ filter, max: 1, time: 30000 });
  const image = imageCollector.size && imageCollector.first().content.toLowerCase() !== 'skip'
    ? imageCollector.first().content.trim()
    : null;

  const embed = new EmbedBuilder()
    .setColor(color)
    .setTitle(title)
    .setDescription(messageContent.trim())
    .setFooter({ text: footer.trim() });

  if (thumbnail) {
    embed.setThumbnail(thumbnail);
  }

  if (image) {
    embed.setImage(image);
  }

  try {
    await channel.send({ embeds: [embed] });
    message.reply(`Message posted successfully in ${channel}.`);
  } catch (error) {
    console.error(error);
    message.reply("There was an error posting the message.");
  }
}

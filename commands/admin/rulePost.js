import { PermissionsBitField, EmbedBuilder } from 'discord.js';

export async function rulePost(message) {
  // Check for ManageGuild permission
  if (!message.member.permissions.has(PermissionsBitField.Flags.ManageGuild)) {
    return message.reply("You don't have permission to use this command.");
  }

  // Step 1: Ask for the channel
  await message.reply("Please mention the channel where you want to post the rule:");

  // Collect channel mention
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

  // Step 2: Ask for the title
  await message.reply("Please provide the title for the rule message:");

  const titleCollector = await message.channel.awaitMessages({ filter, max: 1, time: 30000 });

  if (!titleCollector.size) {
    return message.reply("You did not provide a title in time.");
  }

  const title = titleCollector.first().content;

  // Step 3: Ask for the body content
  await message.reply("Please provide the body of the rule message:");

  const bodyCollector = await message.channel.awaitMessages({ filter, max: 1, time: 30000 });

  if (!bodyCollector.size) {
    return message.reply("You did not provide the message body in time.");
  }

  const messageContent = bodyCollector.first().content;

  // Step 4: Ask for the footer
  await message.reply("Please provide the footer for the message:");

  const footerCollector = await message.channel.awaitMessages({ filter, max: 1, time: 30000 });

  if (!footerCollector.size) {
    return message.reply("You did not provide the footer in time.");
  }

  const footer = footerCollector.first().content;

  // Optional: Ask for color
  await message.reply("You can optionally provide a color in hex format (e.g., #FF0000), or type 'skip' to use the default color:");

  const colorCollector = await message.channel.awaitMessages({ filter, max: 1, time: 30000 });
  const color = colorCollector.size && colorCollector.first().content.toLowerCase() !== 'skip'
    ? colorCollector.first().content.trim()
    : '#0099ff'; // Default color if skipped

  // Optional: Ask for an image or thumbnail
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

  // Step 5: Construct and send the embed
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

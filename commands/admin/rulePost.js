import { PermissionsBitField, EmbedBuilder } from 'discord.js';

export async function rulePost(message, args) {
  // Check for ManageGuild permission
  if (!message.member.permissions.has(PermissionsBitField.Flags.ManageGuild)) {
    return message.reply("You don't have permission to use this command.");
  }

  // Get the channel mention
  const channelMention = args.shift();
  if (!channelMention) {
    return message.reply("Please specify a channel to post the message.");
  }

  const channelId = channelMention.replace(/[<#>]/g, '');
  const channel = message.guild.channels.cache.get(channelId);

  if (!channel) {
    return message.reply("Invalid channel specified.");
  }

  // Get the title and content
  const title = args.shift();
  if (!title) {
    return message.reply("Please provide a title for the message.");
  }

  const content = args.join(' ').split('|');
  if (content.length < 2) {
    return message.reply("Please provide the message content and footer separated by '|'.");
  }

  const [messageContent, footer] = content;

  // Optional arguments for customization
  const color = args.find(arg => arg.startsWith('color:'))?.split(':')[1] || '#0099ff';
  const thumbnail = args.find(arg => arg.startsWith('thumbnail:'))?.split(':')[1];
  const image = args.find(arg => arg.startsWith('image:'))?.split(':')[1];

  // Create the embed
  const embed = new EmbedBuilder()
    .setColor(color)
    .setTitle(title)
    .setDescription(messageContent.trim())
    .setFooter({ text: footer.trim() });

  // Add thumbnail if provided
  if (thumbnail) {
    embed.setThumbnail(thumbnail);
  }

  // Add image if provided
  if (image) {
    embed.setImage(image);
  }

  // Optional fields
  const fields = args.filter(arg => arg.startsWith('field:'));
  fields.forEach(field => {
    const fieldContent = field.split(':').slice(1).join(':');
    const [fieldTitle, fieldValue] = fieldContent.split('|');
    if (fieldTitle && fieldValue) {
      embed.addFields({ name: fieldTitle.trim(), value: fieldValue.trim(), inline: true });
    }
  });

  try {
    await channel.send({ embeds: [embed] });
    message.reply(`Message posted successfully in ${channel}.`);
  } catch (error) {
    console.error(error);
    message.reply("There was an error posting the message.");
  }
}

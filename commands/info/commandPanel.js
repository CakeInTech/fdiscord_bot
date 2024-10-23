import { EmbedBuilder } from 'discord.js';

export async function commandPanel(message) {
  const embed = new EmbedBuilder()
    .setColor('#0099ff')
    .setTitle('Family Bot Pro Command Panel')
    .setDescription('Here are all the available commands for Elders and Admins:')
    .addFields(
      {
        name: 'Moderation Commands',
        value:
        '`!ban @user [reason]` - Ban a user from the server (requires Admin permissions)\n' +
        '`!checkwarnings @user` - Check all warnings for a user\n' +
        '`!mute @user [duration] [reason]` - Temporarily mute a user (e.g., `!mute @user 10m spamming`)\n' +
        '`!unmute @user` - Unmute a muted user\n' +
        '`!recentbans` - Display a list of recent bans in the server\n' +
        '`!recentwarnings` - Display a list of recent warnings issued\n' +
        '`!purge [number]` - Delete up to 100 recent messages in a channel (for Elders and Discord HOST only)'
      },
      {
        name: 'Administrative Commands',
        value:
        '`!rulepost #channel` - Post a rule or announcement in the specified channel.\n' +
        'Usage: Once the command is run, you’ll be prompted to fill out a form for **#channel**, **Title**, **Content**, and **Footer**.'
      },
      {
        name: 'Information Commands',
        value:
        '`!commandpanel` - Display this command panel'
      }
    )
    .setFooter({ text: 'Note: Some commands require specific roles or permissions to use (👑🌟Elder or Discord HOST).' });

  await message.channel.send({ embeds: [embed] });
}

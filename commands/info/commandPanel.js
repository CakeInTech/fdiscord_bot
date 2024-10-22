import { EmbedBuilder, PermissionsBitField } from 'discord.js';

export async function commandPanel(message) {
  const embed = new EmbedBuilder()
    .setColor('#0099ff')
    .setTitle('Family Bot Pro Command Panel')
    .setDescription('Here are all the available commands:')
    .addFields(
      { name: 'Moderation Commands', value:
        '`!ban @user [reason]` - Ban a user\n' +
        '`!checkwarnings @user` - Check warnings for a user\n' +
        '`!mute @user [duration] [reason]` - Mute a user\n' +
        '`!unmute @user` - Unmute a user\n' +
        '`!recentbans` - Show recent bans\n' +
        '`!recentwarnings` - Show recent warnings\n' +
        '`!purge [number]` - Delete recent messages'
      },
      { name: 'Administrative Commands', value:
        '`!rulepost #channel Title | Content | Footer` - Post formatted rules or announcements'
      },
      { name: 'Information Commands', value:
        '`!commandpanel` - Show this command panel'
      }
    )
    .setFooter({ text: 'Note: Some commands require specific permissions to use.' });

  await message.channel.send({ embeds: [embed] });
}

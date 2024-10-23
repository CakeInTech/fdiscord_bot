import { PermissionsBitField } from 'discord.js';
import { getWarnings } from '../../utils/dataManager.js';

export async function checkWarnings(message, args) {
  if (!message.member.permissions.has(PermissionsBitField.Flags.ModerateMembers)) {
    return message.reply("Who are you to command me ?");
  }

  const user = message.mentions.users.first();
  if (!user) {
    return message.reply("I advice you to mention the fam member you want to look on.");
  }

  const warnings = getWarnings(user.id);
  if (warnings.length === 0) {
    return message.channel.send(`${user.tag} has no warnings.`);
  }

  const warningList = warnings.map((warning, index) =>
    `${index + 1}. ${warning.reason} (${new Date(warning.timestamp).toLocaleString()})`
  ).join('\n');

  message.channel.send(`Warnings for ${user.tag}:\n${warningList}`);
}

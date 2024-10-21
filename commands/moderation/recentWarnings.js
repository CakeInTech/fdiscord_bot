import { PermissionsBitField } from 'discord.js';
import { getRecentWarnings } from '../../utils/dataManager.js';

export async function recentWarnings(message) {
  if (!message.member.permissions.has(PermissionsBitField.Flags.ViewAuditLog)) {
    return message.reply("You don't have permission to use this command.");
  }

  const warnings = getRecentWarnings();
  if (warnings.length === 0) {
    return message.channel.send("There are no recent warnings.");
  }

  const warningList = warnings.map((warning, index) =>
    `${index + 1}. <@${warning.userId}> - Reason: ${warning.reason} (${new Date(warning.timestamp).toLocaleString()})`
  ).join('\n');

  message.channel.send(`Recent warnings:\n${warningList}`);
}

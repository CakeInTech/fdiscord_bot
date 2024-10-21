import { PermissionsBitField } from 'discord.js';
import { getRecentBans } from '../../utils/dataManager.js';

export async function recentBans(message) {
  if (!message.member.permissions.has(PermissionsBitField.Flags.ViewAuditLog)) {
    return message.reply("You don't have permission to use this command.");
  }

  const bans = getRecentBans();
  if (bans.length === 0) {
    return message.channel.send("There are no recent bans.");
  }

  const banList = bans.map((ban, index) =>
    `${index + 1}. <@${ban.userId}> - Reason: ${ban.reason} (${new Date(ban.timestamp).toLocaleString()})`
  ).join('\n');

  message.channel.send(`Recent bans:\n${banList}`);
}

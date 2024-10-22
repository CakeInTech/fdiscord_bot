import { ban } from './moderation/ban.js';
import { checkWarnings } from './moderation/checkWarnings.js';
import { mute } from './moderation/mute.js';
import { unmute } from './moderation/unmute.js';
import { recentBans } from './moderation/recentBans.js';
import { recentWarnings } from './moderation/recentWarnings.js';
import { rulePost } from './admin/rulePost.js';
import { purge } from './moderation/purge.js'
import { commandPanel } from './info/commandPanel.js';
import { getElders } from './info/getElders.js';
import { assignRole } from './moderation/assignRole.js';

const commands = {
  ban,
  checkwarnings: checkWarnings,
  mute,
  unmute,
  recentbans: recentBans,
  recentwarnings: recentWarnings,
  rulepost: rulePost,
  purge,
  commandpanel: commandPanel,
  getelders: getElders,
  assignrole: assignRole,
};

export async function handleCommand(message) {
  const args = message.content.slice(1).trim().split(/ +/);
  const command = args.shift().toLowerCase();

  if (commands[command]) {
    await commands[command](message, args);
  }
}

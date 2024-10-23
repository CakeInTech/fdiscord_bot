import pkg from 'discord.js';
const { Client, GatewayIntentBits, Partials } = pkg;
import dotenv from 'dotenv';
import { handleMessage } from './handlers/messageHandler.js';
import { handleGuildMemberAdd } from './handlers/guildMemberHandler.js';
import { loadData } from './utils/dataManager.js';

dotenv.config();


const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessageReactions,
  ],
  partials: [Partials.Message, Partials.Channel, Partials.Reaction],
});

client.once('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
  loadData();
});

client.on('messageCreate', handleMessage);
client.on('guildMemberAdd', handleGuildMemberAdd);

client.login(process.env.DISCORD_TOKEN);

import { EmbedBuilder } from 'discord.js';

export async function handleGuildMemberAdd(member) {
  const welcomeChannel = member.guild.channels.cache.find(
    channel => channel.name === '╭•˖˚🎉ᴡᴇʟᴄᴏᴍᴇ-ɪɴꜰᴏ'
  );

  if (!welcomeChannel) return;

  const welcomeEmbed = new EmbedBuilder()
    .setColor('#0099ff')
    .setTitle(`Welcome to the the Family Clan, ${member.user}!`)
    .setDescription('Please select your role by reacting to this message:')
    .addFields(
      { name: '🐉🔥 Dragon', value: 'React with 🐉', inline: true },
      { name: '⚔️🛡️ Slayer', value: 'React with ⚔️', inline: true },
      { name: '🗡️🔪 Assassin', value: 'React with 🗡️', inline: true },
      { name: '🏴‍☠️💰 Bandit', value: 'React with 🏴‍☠️', inline: true }
    )
    .setFooter({ text: 'You must select a role to access the server.' });

  const welcomeMessage = await welcomeChannel.send({ embeds: [welcomeEmbed] });
  await welcomeMessage.react('🐉');
  await welcomeMessage.react('⚔️');
  await welcomeMessage.react('🗡️');
  await welcomeMessage.react('🏴‍☠️');

  // Set up reaction collector
  const filter = (reaction, user) => {
    return ['🐉', '⚔️', '🗡️', '🏴‍☠️'].includes(reaction.emoji.name) && user.id === member.id;
  };

  const collector = welcomeMessage.createReactionCollector({ filter, max: 1, time: 300000 });

  collector.on('collect', async (reaction, user) => {
    let role;
    switch (reaction.emoji.name) {
      case '🐉':
        role = 'Dragon';
        break;
      case '⚔️':
        role = 'Slayer';
        break;
      case '🗡️':
        role = 'Assassin';
        break;
      case '🏴‍☠️':
        role = 'Bandit';
        break;
    }

    const councilChannel = member.guild.channels.cache.find(
      channel => channel.name === '╭•˖˚🏰ᴄᴏᴜɴᴄɪʟ-ᴄʜᴀᴍʙᴇʀs'
    );

    if (councilChannel) {
      await councilChannel.send(`${member.user.username} has selected the ${role} role. Please verify and assign the role.`);
    }
  });

  collector.on('end', collected => {
    if (collected.size === 0) {
      welcomeChannel.send(`${member}, you didn't select a role in time. Please contact an Elder or Discord Host for assistance.`);
    }
  });
}

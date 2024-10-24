import { EmbedBuilder } from 'discord.js';

export async function handleGuildMemberAdd(member) {
  const welcomeChannel = member.guild.channels.cache.find(
    channel => channel.name === '╭•˖˚🎉ᴡᴇʟᴄᴏᴍᴇ-ɪɴꜰᴏ'
  );

  const rulesChannel = member.guild.channels.cache.find(
    channel => channel.name === '‧˚₊⊹📜ʀᴜʟᴇs'
  );

  const accessChannel = member.guild.channels.cache.find(
    channel => channel.name === '╭•access•╮'
  );

  const councilChannel = member.guild.channels.cache.find(
    channel => channel.name === '‧˚₊⊹𝙀𝙡𝙙𝙚𝙧𝙨-𝙋𝙖𝙨𝙨𝙖𝙜𝙚'
  );

  if (!welcomeChannel || !rulesChannel || !accessChannel || !councilChannel) return;

  const welcomeEmbed = new EmbedBuilder()
    .setColor('#FFD700') // Gold color
    .setTitle(`🌟 Welcome to the Family Clan, ${member.user}! 🌟`)
    .setDescription(`Please select your role by reacting to this message:\n\n` +
      `⚠️ **IMPORTANT:** If you are not a CODM player, please check out the ${accessChannel} channel for assistance. **Do not react to the roles (Dragon, Slayer, Bandit, Assassin) unless you are a CODM player!**\n\n` +
      `While you wait for your roles to be verified, please click on ${rulesChannel} and read the rules carefully!`)
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

  // Set up reaction collector for user role selection
  const filter = (reaction, user) => {
    return ['🐉', '⚔️', '🗡️', '🏴‍☠️'].includes(reaction.emoji.name) && user.id === member.id;
  };

  const collector = welcomeMessage.createReactionCollector({ filter, max: 1, time: 300000 });

  collector.on('collect', async (reaction) => {
    let role;
    switch (reaction.emoji.name) {
      case '🐉':
        role = 'dragon';
        break;
      case '⚔️':
        role = 'slayer';
        break;
      case '🗡️':
        role = 'assassin';
        break;
      case '🏴‍☠️':
        role = 'bandit';
        break;
    }

    // Notify the elders in the Elders-Passage channel
    const roleRequestEmbed = new EmbedBuilder()
      .setColor('#FFD700')
      .setTitle(`Role Request: ${member.user.username}`)
      .setDescription(`Requested Role: **${role}**\n\nReact with ✅ to approve or ❌ to deny.`);

    const roleRequestMessage = await councilChannel.send({ embeds: [roleRequestEmbed] });

    // Add confirmation reactions
    await roleRequestMessage.react('✅');
    await roleRequestMessage.react('❌');

    // Set up reaction collector for elders to verify the role
    const elderFilter = (reaction, user) => {
      return ['✅', '❌'].includes(reaction.emoji.name) && user.roles.cache.some(r => r.name === 'Elder');
    };

    const elderCollector = roleRequestMessage.createReactionCollector({ elderFilter, max: 1, time: 300000 });

    elderCollector.on('collect', async (reaction) => {
      if (reaction.emoji.name === '✅') {
        // Assign the role
        const roleToAssign = member.guild.roles.cache.find(r => r.name.toLowerCase() === role);
        if (roleToAssign) {
          await member.roles.add(roleToAssign);
          await member.send(`You have been assigned the **${role}** role! Welcome to the clan! 🎉`);
        }
      } else {
        // Deny the role assignment, kick the member and send DM
        await member.send(`Your request for the **${role}** role has been denied. Please rejoin the server and select a correct role.`);
        await member.kick('Incorrect role selected. Rejoin to select the correct role.');
      }
    });

    elderCollector.on('end', collected => {
      if (collected.size === 0) {
        councilChannel.send(`Role request for ${member.user.username} timed out. Please review it when you can.`);
      }
    });
  });

  collector.on('end', collected => {
    if (collected.size === 0) {
      welcomeChannel.send(`${member}, you didn't select a role in time. Please contact an Elder or Discord Host for assistance.`);
    }
  });
}

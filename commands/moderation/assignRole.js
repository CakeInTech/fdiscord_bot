import { PermissionsBitField, EmbedBuilder } from 'discord.js';

export async function assignRole(message, args) {
  const eldersPassageChannel = message.guild.channels.cache.find(channel => channel.name === 'elders-passage');

  if (message.channel.id !== eldersPassageChannel.id) {
    return message.reply("Please use this command in the `Elders-Passage` channel.");
  }

  if (!message.member.permissions.has(PermissionsBitField.Flags.ManageRoles)) {
    return message.reply("You don't have permission to use this command.");
  }
  const mentionedUser = message.mentions.members.first();

  if (!mentionedUser) {
    return message.reply("Please mention a valid user.");
  }

  const roleName = args.slice(1).join(' ');

  if (!roleName) {
    return message.reply("Please provide the role name you want to assign or deny.");
  }

  const role = message.guild.roles.cache.find(r => r.name.toLowerCase() === roleName.toLowerCase());

  if (!role) {
    return message.reply("Invalid role name. Please provide a valid role name.");
  }

  const confirmEmbed = new EmbedBuilder()
    .setColor('#ffd700')
    .setTitle(`Role Assignment Confirmation`)
    .setDescription(`Are you sure you want to assign the **${role.name}** role to ${mentionedUser.user.username}?`)
    .addFields(
      { name: 'User:', value: `${mentionedUser.user}`, inline: true },
      { name: 'Role:', value: role.name, inline: true }
    );

  const confirmationMessage = await message.channel.send({ embeds: [confirmEmbed] });
  await confirmationMessage.react('✅');
  await confirmationMessage.react('❌');

  const filter = (reaction, user) => {
    return ['✅', '❌'].includes(reaction.emoji.name) && user.id === message.author.id;
  };

  const collector = confirmationMessage.createReactionCollector({ filter, max: 1, time: 30000 });

  collector.on('collect', async (reaction) => {
    if (reaction.emoji.name === '✅') {
      await mentionedUser.roles.add(role);
      message.channel.send(`${mentionedUser.user.username} has been assigned the **${role.name}** role.`);
    } else {
      message.channel.send(`Role assignment for ${mentionedUser.user.username} has been canceled.`);
    }
  });

  collector.on('end', collected => {
    if (collected.size === 0) {
      message.channel.send('Role assignment request timed out.');
    }
  });
}

export async function getElders(message) {
  try {
    const guild = message.guild;

    const elderRole = guild.roles.cache.find(role => role.name === '👑🌟Elder');

    if (!elderRole) {
      return message.reply("Looks like such things don't exist in this universe!");
    }

    const members = await guild.members.fetch();

    const elders = members.filter(member => member.roles.cache.has(elderRole.id));

    if (elders.size === 0) {
      return message.reply("Where are the elders? hmm I don't see any here.");
    }

    const elderMentions = elders.map(member => member.user.toString()).join(', ');

    return message.reply(`The elders are: ${elderMentions}`);
  } catch (error) {
    console.error("Error fetching elders:", error);
    message.reply("There was an error trying to fetch the elders.");
  }
}

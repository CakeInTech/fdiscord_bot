export async function getElders(message) {
  try {
    const guild = message.guild;

    // Find the '👑🌟Elder' role in the server's roles cache
    const elderRole = guild.roles.cache.find(role => role.name === '👑🌟Elder');

    // If the '👑🌟Elder' role is not found
    if (!elderRole) {
      return message.reply("Looks like such things don't exist in this universe!");
    }

    // Fetch all members to ensure we're getting the latest data
    const members = await guild.members.fetch();

    // Get all members with the '👑🌟Elder' role
    const elders = members.filter(member => member.roles.cache.has(elderRole.id));

    // If no members have the 'Elder' role
    if (elders.size === 0) {
      return message.reply("Where are the elders? hmm I don't see any here.");
    }

    // Create a list of elder members' mentions
    const elderMentions = elders.map(member => member.user.toString()).join(', ');

    // Send a reply with the list of elders, mentioning them
    return message.reply(`The elders are: ${elderMentions}`);
  } catch (error) {
    console.error("Error fetching elders:", error);
    message.reply("There was an error trying to fetch the elders.");
  }
}

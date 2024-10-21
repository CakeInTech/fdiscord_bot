# Family Bot Pro

Family Bot Pro is a Discord bot designed specifically for managing a Call of Duty Mobile (CODM) family clan Discord server. It provides various functionalities for role management, moderation, and interaction.

## Features

- Role management for new members
- Moderation commands (ban, mute, unmute)
- Warning system with automatic muting
- Curse word detection and warning
- Recent bans and warnings tracking
- Rule posting in specific channels
- AI-powered responses

## Commands

### Moderation Commands

1. **Ban a user**

   ```
   !ban @user [reason]
   ```

   Bans the mentioned user from the server. Only Elders and Discord Hosts can use this command.

2. **Check warnings**

   ```
   !checkwarnings @user
   ```

   Displays the warning history of the mentioned user. Only Elders and Discord Hosts can use this command.

3. **Mute a user**

   ```
   !mute @user [duration_in_minutes] [reason]
   ```

   Mutes the mentioned user for the specified duration. If no duration is provided, the default is 3 hours. Only Elders and Discord Hosts can use this command.

4. **Unmute a user**

   ```
   !unmute @user
   ```

   Unmutes the mentioned user. Only Elders and Discord Hosts can use this command.

5. **View recent bans**

   ```
   !recentbans
   ```

   Displays a list of recently banned users. Only Elders and Discord Hosts can use this command.

6. **View recent warnings**
   ```
   !recentwarnings
   ```
   Displays a list of recent warnings issued to users. Only Elders and Discord Hosts can use this command.

### Administrative Commands

7. **Post rules or announcements**
   ```
   !rulepost #channel-name Your message here
   ```
   Posts a message (such as rules or announcements) to the specified channel. Only Elders and Discord Hosts can use this command.

## Automated Features

1. **Welcome Message and Role Selection**
   When a new user joins the server, the bot will send a welcome message in the [╭•˖˚🎉ᴡᴇʟᴄᴏᴍᴇ-ɪɴꜰᴏ] channel. The message will prompt the user to select a role by reacting to the message with the appropriate emoji.

2. **Role Verification**
   After a user selects a role, the bot will send a message to the [╭•˖˚🏰ᴄᴏᴜɴᴄɪʟ-ᴄʜᴀᴍʙᴇʀs] channel for Elders to manually verify and assign the role.

3. **Curse Word Detection**
   The bot automatically detects curse words in messages and issues warnings to users. After three warnings, the user is automatically muted for 3 hours.

4. **AI Responses**
   When the bot is mentioned in a message, it will respond using AI-generated text. These responses are friendly and may occasionally include references to Call of Duty Mobile.

## Role Hierarchy

- 👑🌟 Elder and Discord Host: Full administrative powers and access to all bot commands.
- Other roles (Dragon, Slayer, Assassin, Bandit): Represent clan rankings but do not have access to bot commands.

## Setup and Configuration

To set up and run the Family Bot Pro, follow these steps:

1. Clone the repository to your local machine or server.
2. Install the required dependencies by running `npm install`.
3. Create a `.env` file in the root directory with the following content:
   ```
   DISCORD_TOKEN=your_discord_bot_token_here
   OPENAI_API_KEY=your_openai_api_key_here
   ```
4. Replace `your_discord_bot_token_here` with your Discord bot token and `your_openai_api_key_here` with your OpenAI API key.
5. Start the bot by running `node index.js`.

Make sure to invite the bot to your Discord server and grant it the necessary permissions to function properly.

## Contributing

If you'd like to contribute to the development of Family Bot Pro, please fork the repository, make your changes, and submit a pull request.

## Support

If you encounter any issues or have questions about using Family Bot Pro, please open an issue in the GitHub repository or contact the bot administrators in your Discord server.

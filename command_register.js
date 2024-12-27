const { REST, Routes } = require('discord.js');
const path = require('node:path');
const { getFilePaths } = require('./utility/function');
require('dotenv').config();
const chalk = require("chalk");

const commands = [];
// Grab all the command folders from the commands directory you created earlier
const foldersPath = path.join(__dirname, 'commands');

const filePaths = getFilePaths(foldersPath);
for (const filePath of filePaths) {
    const command = require(filePath);
    if('data' in command && 'execute' in command) {
        commands.push(command.data.toJSON());
    } else {
        console.log(chalk.bgRed(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`));
    }
}

// Construct and prepare an instance of the REST module

const rest = new REST().setToken(process.env.TOKEN);

// and deploy your commands!
(async () => {
    try {
        console.log(chalk.yellow(`Started refreshing ${commands.length} application (/) commands.`));

        // The put method is used to fully refresh all commands in the guild with the current set
        const data = await rest.put(
            Routes.applicationCommands(process.env.BOT_ID),
            { body: commands },
        );

        console.log(chalk.green(`Successfully reloaded ${data.length} application (/) commands.`));
    } catch (error) {
        // And of course, make sure you catch and log any errors!
        console.error(error);
    }
})();

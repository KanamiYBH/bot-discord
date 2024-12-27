// Command Handler
const { join } = require('path');
const { Collection } = require('discord.js');
const { getFilePaths } = require('../utility/function');
const chalk = require("chalk");

const foldersPath = join(__dirname, '..', 'commands');

module.exports = (client) => {
    client.commands = new Collection();

    const filePaths = getFilePaths(foldersPath);
    for (const filePath of filePaths) {
        const command = require(filePath);
        if ('data' in command && 'execute' in command) {
            client.commands.set(command.data.name, command);
        } else {
            console.log(chalk.bgRed(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`));
        }
    }
}
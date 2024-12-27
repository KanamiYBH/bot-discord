const { Collection } = require('discord.js');
const { join } = require('path');
const { getFilePaths } = require('../utility/function');
const chalk = require('chalk');

const folderPath = join(__dirname, '..', 'component', 'button');

module.exports = (client) => {
    client.buttons = new Collection();

    const filePaths = getFilePaths(folderPath);
    for (const buttonPath of filePaths) {
        const button = require(buttonPath);
        if ('category' in button && 'id' in button && 'execute' in button) {
            if (!client.buttons.has(button.category)) client.buttons.set(button.category, new Collection());
            if (client.buttons.get(button.category).get(button.id)) {
                console.log(chalk.bgRed.black(`[WARNING]`) + chalk.red(` The button in category `) + chalk.yellow(`${button.category}`) + chalk.red(` already has a component with ID: `) + chalk.yellow(`${button.id}`));
                return;
            }
            client.buttons.get(button.category).set(button.id, button);
        } else {
            console.log(chalk.white.bgRed(`[WARNING] The button component at ${buttonPath} is missing a required "category" or "id" or "execute" property.`));
        }
    }
}

const { Collection } = require('discord.js');
const { join } = require('path');
const { getFilePaths } = require('../utility/function');
const chalk = require('chalk');

const folderPath = join(__dirname, '..', 'component', 'selectMenu');

module.exports = (client) => {
    client.selectMenu = new Collection();

    const filePaths = getFilePaths(folderPath);
    for (const selectMenuPath of filePaths) {
        const selectMenu = require(selectMenuPath);
        if ('category' in selectMenu && 'id' in selectMenu && 'execute' in selectMenu) {
            if (!client.selectMenu.has(selectMenu.category)) client.selectMenu.set(selectMenu.category, new Collection());
            if (client.selectMenu.get(selectMenu.category).get(selectMenu.id)) {
                console.log(chalk.bgRed.black(`[WARNING]`) + chalk.red(` The button in category `) + chalk.yellow(`${selectMenu.category}`) + chalk.red(` already has a component with ID: `) + chalk.yellow(`${selectMenu.id}`));
                return;
            }
            client.selectMenu.get(selectMenu.category).set(selectMenu.id, selectMenu);
        } else {
            console.log(chalk.white.bgRed(`[WARNING] The button component at ${selectMenuPath} is missing a required "category" or "id" or "execute" property.`));
        }
    }
}

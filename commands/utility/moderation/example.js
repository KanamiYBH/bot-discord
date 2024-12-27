const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    permission : 'moderator',
    data: new SlashCommandBuilder()
        .setName('command')
        .setDescription('description'),
    /**
    * 
    * @param {import('discord.js').ChatInputCommandInteraction} interaction
    */
    async execute(interaction) {
        try {
            // code
        } catch (e) {
            console.error(e);
            await interaction.reply({
                content: 'An error occurred while attempting to execute this command.',
                ephemeral: true
            });
        }
    }
};
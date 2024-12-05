const { SlashCommandBuilder } = require("discord.js");

module.exports = {
    category: 'utility',
    data: new SlashCommandBuilder()
        .setName('pet')
        .setDescription('reply dengan nama hewan')
        .addStringOption(option =>
            option.setName('animal')
                .setDescription('pilih nama hewan')
                .setRequired(true)
                .addChoices(
                    { name: 'panda', value: 'Cute Panda!' },
                    { name: 'cat', value: 'Cute Cat!' },
                    { name: 'dog', value: 'Cute Dog!' }
                )
        ),
    /**
     *  
     * @param {import('discord.js').ChatInputCommandInteraction} interaction 
     */
    async execute(interaction) {
        try {
            let pet = interaction.options.getString('animel');

            await interaction.reply(`${pet} is selected`);
        } catch (e) {
            console.error(e);
            await interaction.reply({
                content: 'An error occurred while attempting to execute this command.',
                ephemeral: true
            });
        }
    }
}
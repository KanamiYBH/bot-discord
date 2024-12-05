const { SlashCommandBuilder } = require("discord.js");

module.exports = {
    category: 'utility',
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Cek apakah bot online'),
    /**
     *  
     * @param {import('discord.js').ChatInputCommandInteraction} interaction 
     */
    async execute(interaction) {
        try {
            const sent = await interaction.reply({ content: 'Pinging...', fetchReply: true });
            interaction.editReply(`Roundtrip latency: ${sent.createdTimestamp - interaction.createdTimestamp}ms`);
        } catch (e) {
            console.error(e);
            await interaction.reply({
                content: 'An error occurred while attempting to execute this command.',
                ephemeral: true
            });
        }
    }
}
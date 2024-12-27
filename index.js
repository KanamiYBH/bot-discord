require('dotenv').config();
const { Client, GatewayIntentBits } = require('discord.js');
const connectDB = require('./database/connect');
const loadCommand = require('./handlers/command');
const loadButton = require('./handlers/button');
const loadSelectMenu = require('./handlers/selectMenu');
const loadEvent = require('./handlers/event');

// Create a new client instance
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
    ]
});

// load database connection
connectDB().catch(err => console.error(err));

// Handlers
loadCommand(client);
loadButton(client);
loadSelectMenu(client);
loadEvent(client);

// Log in to Discord with your client's token
client.login(process.env.TOKEN);
const { Client, Intents } = require('discord.js');

const client = new Client({ intents: [] });

client.once('ready', () => {
    console.log('Library of Babel');
});

//Keep this as last line
client.login('ODc0MTU5NTIwNTY4NDU1MTg4.YRC6fg.zgZFOFqhysz_epuBQ92c2DYZ54s');
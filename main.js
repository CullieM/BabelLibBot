const { Client, Intents } = require('discord.js');

const client = new Client({ intents: [] });

const prefix = '-';

client.on('message', message => {
    if(!message.content.startsWith(prefix) || message.author.bot) return;
    
    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();

    if(command === 'ping')
    {
        message.channel.send('pong!');
    }


});

// ! DEBUG
client.once('ready', () => {
    console.log('Library of Babel');
});

//Keep this as last line
client.login('ODc0MTU5NTIwNTY4NDU1MTg4.YRC6fg.zgZFOFqhysz_epuBQ92c2DYZ54s');
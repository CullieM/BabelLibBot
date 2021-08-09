const { Client, Intents } = require('discord.js');

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });


const prefix = "-";

// ! DEBUG
client.once('ready', () => {
    console.log('Library of Babel 4');
});

client.on('messageCreate', message => {
    console.log(message.content);


    if (message.content.includes("!find ") && !message.author.bot) {
        var search_str = message.content.replace("!find ", "");

        message.reply(searchTitle(search_str));

    } else if (message.content.includes("!find") && !message.author.bot) {
        message.reply("Correct use of the command is: !find string, where string is the word you wish to find in the Library.");
    }

});

function searchTitle(search_str) {
    //randomly generate location numbers
    wall = '' + parseInt(Math.random() * 3 + 1)
    shelf = '' + parseInt(Math.random() * 4 + 1)
    volume = pad('' + parseInt(Math.random() * 31 + 1), 2)
    locHash = hashCode(wall + shelf + volume + 4);
    hex = '';
    search_str = search_str.substr(0, exports.length_of_title);
    while (search_str.length < exports.length_of_title) {
        search_str += ' ';
    }
    //hash of loc will be used to create a seeded RNG
    seed = Math.abs(locHash);
    for (var i = 0; i < search_str.length; i++) {
        index = digs.indexOf(search_str[i]);
        //for each calculated value of the rng, it will be added to the index value and modded to len of an
        rand = seededRandom(0, digs.length);
        newIndex = (index + parseInt(rand)).mod(an.length);
        newChar = an[newIndex];
        //hex will be built from the indexes translated into an
        hex += newChar;
    }
    return hex + ':' + wall + ':' + shelf + ':' + parseInt(volume)
}

pad = function (s, size) {
    while (s.length < size) s = "0" + s;
    return s;
}

seededRandom = function (min, max) {
    max = max || 1;
    min = min || 0;

    seed = (seed * 9301 + 49297) % 233280;
    var rnd = seed / 233280;

    return min + rnd * (max - min);
}

Number.prototype.mod = function (n) {
    return ((this % n) + n) % n;
};
an = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
//digs must be the same length as an
digs = 'abcdefghijklmnopqrstuvwxyz, .aeiouy ';
hashCode = function (s) {
    var hash = 0, i, chr, len;
    if (s.length == 0) return hash;
    for (i = 0, len = s.length; i < len; i++) {
        chr = s.charCodeAt(i);
        hash = ((hash << 5) - hash) + chr;
        hash |= 0; // Convert to 32bit integer
    }
    return hash;
};

//Keep this as last line
client.login('ODc0MTU5NTIwNTY4NDU1MTg4.YRC6fg.zgZFOFqhysz_epuBQ92c2DYZ54s');
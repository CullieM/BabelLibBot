import { default as config } from './config.js';
import { Client, Intents } from 'discord.js';
import * as Babel from './libraryofbabel.js';

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });
const regex = /.*:.*:.*:.*:.*/;

client.on('messageCreate', message => 
{
    if (message.content.includes("!search ") && !message.author.bot) {
        var search_str = message.content.replace("!search ", "");
        var return_str = Babel.search(search_str);
        message.reply(return_str);
    } 
    else if (message.content.includes("!searchTitle ") && !message.author.bot) 
    {
        var search_str = message.content.replace("!searchTitle ", "");
        var return_str = Babel.searchTitle(search_str);
        message.reply(return_str);
    }
    else if (message.content.includes("!getPage ") && !message.author.bot) 
    {
        var search_str = message.content.replace("!getPage ", "");
        if(search_str.match(regex))
        {
            var return_str = Babel.getPage(search_str);
            message.reply(return_str);
        }else
        {
            message.reply("Address uses the wrong format");
        }
    }
    else if (message.content.includes("!getPageTitle ") && !message.author.bot) 
    {
        var search_str = message.content.replace("!getTitlePage ", "");
        if(search_str.match(regex))
        {
            var return_str = Babel.getTitle(search_str);
            message.reply(return_str);
        }else
        {
            message.reply("Address uses the wrong format");
        }
       
    }
    else if (message.content.includes("!help") && !message.author.bot) 
    {
        message.reply("Available commands are:\n!search *text*,\n!searchTitle *text*,\n!getPage *hex-addr*,\n!getPageTitle *hex-addr*");
    }
});

client.login(config.token);
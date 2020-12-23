//--------------dépendance--------------
const Discord = require("discord.js");
const config = require("./config.json");
//--------------------------------------


//--------------def client-------------
const client = new Discord.Client();
//-------------------------------------









//------------Token------------
client.login(config.BOT_TOKEN);
//---------------fin------------
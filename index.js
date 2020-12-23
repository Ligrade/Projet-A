//--------------dépendance--------------
const Discord = require("discord.js");
const config = require("./config.json");
//--------------------------------------


//--------------def client-------------
const client = new Discord.Client();
//-------------------------------------

    //----------Power Message---------
    client.on("ready", () => {
        console.log("Bot on");
    });
    //--------------------------------



//------------Token------------
client.login(config.BOT_TOKEN);
//---------------fin------------
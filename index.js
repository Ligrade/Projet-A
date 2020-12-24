//--------------dépendance--------------
const Discord = require("discord.js");
const config = require("./config.json");
let alexa = require('alexa-bot-api');
const prefix = ("!");
//--------------------------------------


//--------------API---------------
let chatbot = new alexa("aw2plm")
//--------------------------------


//--------------def client-------------
const client = new Discord.Client();
//-------------------------------------


    //----------Power Message---------
    client.on("ready", () => {
        console.log("Bot on");
    });
    //--------------------------------


    //-----------------------------------------Actions-----------------------------------------------------
    client.on('message', msg => {


        //------------------------!Alexa-----------------------------
        if(msg.content.startsWith(`${prefix}alexa`)){
            if(msg.author.bot) return;
                let cont = msg.content;
                chatbot.getReply(cont).then(r => msg.channel.send(r))
        }
        //------------------------------------------------------------


        //--------------------------------------!Ping-----------------------------------------
        if(msg.content.startsWith(`${prefix}ping`)) {
      
            let embed = new Discord.MessageEmbed()
                .setColor(0x43f033)
                .setDescription(`Loading...`)
                .setTimestamp()
            msg.channel.send(embed).then(msg => {
                embed.setColor(0x43f033)
                embed.setDescription(`:ping_pong: Pong ! **${Math.round(client.ws.ping)}ms**`)
                embed.setFooter(`!ping`)
                embed.setTimestamp()
                msg.edit(embed)
          })
        
        }
        //--------------------------------------------------------------------------------------

    });
    //-----------------------------------------------------------------------------------------------------


//------------Token------------
client.login(config.BOT_TOKEN);
//---------------fin------------
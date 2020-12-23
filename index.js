//--------------dépendance--------------
const Discord = require("discord.js");
const config = require("./config.json");
const prefix = ("!");
//--------------------------------------


//--------------def client-------------
const client = new Discord.Client();
//-------------------------------------

    //----------Power Message---------
    client.on("ready", () => {
        console.log("Bot on");
    });
    //--------------------------------

    client.on('message', msg => {
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
    });

//------------Token------------
client.login(config.BOT_TOKEN);
//---------------fin------------
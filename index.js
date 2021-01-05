//--------------dépendance--------------
const Discord = require("discord.js");
const config = require("./config.json");
const ytdl = require("ytdl-core");
let alexa = require('alexa-bot-api');
const { getInfo } = require("ytdl-core");
const prefix = ("!");
var list = [];
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
    client.on('message', async msg => {

            if(msg.content.startsWith(`${prefix}help`)) { 
                let embed = new Discord.MessageEmbed()
                    .setTitle(':robot: **HELP** :robot:')
                    .setDescription('`Voici la listes des commandes:`')
                    .addField('**!play**',"Play <URL>")
                    .addField('**!stop**',"Stop la musique et le déco")
                    .addField('**!playlist**',"Affiche les musiques en attente...")
                    .addField('**!ping**',"Affiche le ping du bot")
                    .setColor('BLUE')
                    .setFooter('Projet-A')
                    msg.channel.send(embed);
              }

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

        
        //------------------------!Alexa-----------------------------
        if(msg.content.startsWith(`${prefix}alexa`)){
            if(msg.author.bot) return;
                let cont = msg.content;
                chatbot.getReply(cont).then(r => msg.channel.send(r))
        }
        //------------------------------------------------------------


        //--------------------------------------yt------------------------------------

        let args = msg.content.split(" ");
        if(msg.content === prefix + "playlist"){
            let message = "**File D'attente !**\n";
            for(var i = 0;i < list.length;i++){
                let name;
                await ytdl.getInfo(list[i]).then(info => {
                    
                        name = info.videoDetails.title;
                    
                });
                message += "> " + i + " - " + name + "\n";
            }
            msg.channel.send(message);
        }
        else if(msg.content.startsWith(prefix + "play")){
            if(msg.member.voice.channel){
                    
                
                if(args[1] == undefined || !args[1].startsWith("https://www.youtube.com/watch?v=")){
                        msg.reply("Lien de la Vidéo non ou mal mentionné");
                }
                else{
                    if(list.length > 0){
                            list.push(args[1]);
                            msg.reply("Vidéo ajouté à la liste.");
                            
                    }
                    else{
                            list.push(args[1]);
                            msg.reply("Vidéo ajouté à la liste.");
                           

                            msg.member.voice.channel.join().then(connection => {
                                playMusic(connection);
                                connection.on("disconnect", () => {
                                    list = [];
                                });
                        }).catch(err => {
                        msg.reply("Erreur lors de la connextion : " + err);
                        })
                    }
                }

            }
            else{
                msg.reply("Vous n'êtes pas dans un channel vocal, Veuillez vous y connectez pour faire cette commande.");
            }
        }
        else  if(msg.content.startsWith(prefix + "stop")){
            msg.reply("Votre bot et déconnecter"); 
            msg.member.voice.channel.leave();
        }
            function playMusic(connection){
                let dispatcher = connection.play(ytdl(list[0], {quality: "highestaudio"}));

                    dispatcher.on("finish", () => {
                        list.shift();
                        dispatcher.destroy();

                        if(list.length > 0){
                            playMusic(connection);
                        }
                        else{
                            connection.disconnect();
                        }
                    })

                dispatcher.on("error", err => {
                    console.log("Erreur au niveau du dispacher : " + err);
                    dispatcher.destroy();
                    connection.disconnect();
                });
            }

    

        
    });
        //----------------------------------------------------------------------------


    
    //-----------------------------------------------------------------------------------------------------


//------------Token------------
client.login(config.BOT_TOKEN);
//---------------fin------------
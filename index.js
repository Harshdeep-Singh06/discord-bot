require("dotenv").config();

const { Client, GatewayIntentBits } = require("discord.js");
const axios = require("axios");

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});

client.on("messageCreate", (message) => {

    if (message.author.bot) return;

    if (message.content.startsWith("create")) {

        const url = message.content.split(" ")[1];

        if (!url) {
            return message.reply("Please provide a URL.");
        }

        return message.reply({
            content: "Generating Short ID for " + url,
        });
    }

    message.reply({
        content: "Hi from Bot",
    });
});


client.on("interactionCreate", async (interaction) => {

    if (!interaction.isChatInputCommand()) return;

    if (interaction.commandName === "ping") {
        return interaction.reply("Pong!!");
    }

   if(interaction.commandName === "create"){
    const url = interaction.options.getString("url");
    await interaction.deferReply();

    try{
        const response = await axios.post(
            "http://localhost:8001/url/discord",
            {
                url: url
            }
        );
        return interaction.editReply(
            `Short URL created!\n${response.datashortURL}`
        );
    }catch(error){
        console.error(error);
        return interaction.editReply(
            "Failed to create short URL"
        )
    }
   }
});

client.login(process.env.DISCORD_TOKEN);
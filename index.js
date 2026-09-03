require("dotenv").config();

const { Client, GatewayIntentBits } = require("discord.js");

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

    if (interaction.commandName === "create") {

        const url = interaction.options.getString("url");

        return interaction.reply(
            `Generating short URL for: ${url}`
        );
    }
});

client.login(process.env.DISCORD_TOKEN);
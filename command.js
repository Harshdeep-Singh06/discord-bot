require("dotenv").config();

const { REST, Routes } = require("discord.js");

const commands = [
    {
        name: "ping",
        description: "Replies with Pong!",
    },
    {
        name: "create",
        description: "Create a short URL",
        options: [
            {
                name: "url",
                description: "Enter the URL you want to shorten",
                type: 3,
                required: true,
            },
        ],
    },
];

const rest = new REST({ version: "10" })
    .setToken(process.env.DISCORD_TOKEN);

(async () => {
    try {
        console.log("Started refreshing application (/) commands.");

        await rest.put(
            Routes.applicationGuildCommands(
                process.env.CLIENT_ID,
                "1544926245307809855"
            ),
            { body: commands }
        );

        console.log("Successfully reloaded application (/) commands.");
    } catch (error) {
        console.error(error);
    }
})();
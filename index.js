const { Client, GatewayIntentBits, Events, ActivityType, Collection } = require('discord.js');
require('dotenv').config();
const fs = require('fs');
const path = require('path');

// Creando un nuevo cliente Discord
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

// Cargando comandos
client.commands = new Collection();

const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);

    if (command.data && command.execute) {
        client.commands.set(command.data.name, command);
        console.log(`Comando ${command.data.name} cargado.`);
    } else {
        console.log(`[ADVERTENCIA] El comando en ${filePath} no tiene una propiedad "data" o "execute" requerida.`);
    }
}

client.on(Events.InteractionCreate, async interaction => {
    if(!interaction.isChatInputCommand()) return;
    
    const command = client.commands.get(interaction.commandName);

    if (!command) {
        console.error(`No se encontró el comando ${interaction.commandName}.`);
        return;
    }

    try {
        await command.execute(interaction);
    } catch (error) {
        console.error(`Ha ocurrido un error al utilizar el comando ?${interaction.commandName}`, error);
        await interaction.reply({ content: 'Ha ocurrido un error al utilizar este comando.', ephemeral: true });
    }
})

// Eventos
client.once(Events.ClientReady, () => {
    console.log(`¡Listo! 🎉 Bot conectado como ${client.user.tag}!`);
    client.user.setActivity('las voces en mi cabeza', { type: ActivityType.Listening });
});

// Login del bot
client.login(process.env.DISCORD_TOKEN);
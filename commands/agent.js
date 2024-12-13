const { SlashCommandBuilder } = require("discord.js");
const agentsList = require('../data/agents.js');

const roleColors = {
    'Duelista 💥': 0xFF5733,
    'Controlador 🌫️': 0x33FF57,
    'Centinela 🛡️': 0x3357FF,
    'Iniciador 🎯': 0xFF33A1,
};

module.exports = {
    data: new SlashCommandBuilder()
        .setName('agente')
        .setDescription('Selección aleatoria de un agente.'),

    async execute(interaction) {
        console.log('Ejecutando comando /agent...');

            // Seleccionar un agente aleatorio
            const electedAgent = agentsList[Math.floor(Math.random() * agentsList.length)];

            // Elegir un GIF aleatorio del agente
            const randomGif = electedAgent.gif[Math.floor(Math.random() * electedAgent.gif.length)];

            return interaction.reply({
                // content: `🎉  El agente seleccionado es **${electedAgent.name}**\n` + 
                // `💬  *${electedAgent.phrases}*\n` + 
                // `Rol: ${electedAgent.role}`,
                embeds: [
                    {
                        title: `🎭  **${electedAgent.name}** - ${electedAgent.role}`,
                        description: `💬  *${electedAgent.phrases}*`,
                        color: roleColors[electedAgent.role] || 0xFFFFFF,
                        image: { url: randomGif },
                        footer: { text: 'A ver si pegas un tiro, burro.' }
                    }
                ]
            });
    },
};
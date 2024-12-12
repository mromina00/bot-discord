const { SlashCommandBuilder } = require("discord.js");
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));

let agentsList = [
    'Brimstone', 'Phoenix', 'Sage', 'Sova', 'Viper', 
    'Cypher', 'Reyna', 'Killjoy', 'Breach', 'Omen', 
    'Jett', 'Raze', 'Skye', 'Yoru', 'Astra', 
    'KAY/O', 'Chamber', 'Neon', 'Fade', 'Harbor', 
    'Gekko', 'Deadlock','Iso', 'Clove', 'Vyse'
];

module.exports = {
    data: new SlashCommandBuilder()
        .setName('agente')
        .setDescription('Selección aleatoria de un agente.')
        .addSubcommand(subcommand => 
            subcommand
                .setName('random')
                .setDescription('Selecciona un agente aleatorio.'))
        .addSubcommand(subcommand => 
            subcommand
                .setName('reset')
                .setDescription('Reinicia la lista de agentes.')),
    async execute(interaction) {
        console.log('Ejecutando comando /agent...');
        const subcommand = interaction.options.getSubcommand();

        if (subcommand === 'reset') {
            agentsList = [
                'Brimstone', 'Phoenix', 'Sage', 'Sova', 'Viper', 
                'Cypher', 'Reyna', 'Killjoy', 'Breach', 'Omen', 
                'Jett', 'Raze', 'Skye', 'Yoru', 'Astra', 
                'KAY/O', 'Chamber', 'Neon', 'Fade', 'Harbor', 
                'Gekko', 'Deadlock','Iso', 'Clove', 'Vyse'
            ];
            return interaction.reply('🔄️ ¡La lista de agentes se ha reiniciado! 🔄️');
        }

        if (subcommand === 'random') {
            if (agentsList.length === 0) {
                return interaction.reply('⚠️¡No hay más agentes disponibles!⚠️ Usa "/agente reset" para reiniciar.');
            }
    
            const elected = agentsList[Math.floor(Math.random() * agentsList.length)];
            agentsList = agentsList.filter(agent => agent !== elected);

            // Obtener gif del agente elegido desde Giphy
           try {
            // Solicitar un GIF a Giphy
            const giphyApiKey = process.env.GIPHY_API_KEY;
            const giphyResponse = await fetch(`https://api.giphy.com/v1/gifs/search?api_key=${giphyApiKey}&q=${elected}-valorant-agent&limit=1&rating=g`);

            const gifData = await giphyResponse.json();
            const gifUrl = gifData.data && gifData.data[0] ? gifData.data[0].images.original.url : null;

            if (gifUrl) {
                return interaction.reply({
                    content: `🎉 Te toca usar **${elected}** 🎉`,
                    embeds: [{ image: { url: gifUrl } }]
                });
            } else {
                return interaction.reply(`🎉 Te toca usar **${elected}** 🎉`);
            }
           } catch (error) {
                console.error('Error al obtener GIF de Giphy:', error);
                return interaction.reply('Ha ocurrido un error al seleccionar un agente.');
           }

        }
    },
};
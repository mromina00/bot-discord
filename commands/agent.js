const { SlashCommandBuilder } = require("discord.js");

let agentsList = [
    'Brimstone', 'Phoenix', 'Sage', 'Sova', 'Viper', 
    'Cypher', 'Reyna', 'Killjoy', 'Breach', 'Omen', 
    'Jett', 'Raze', 'Sky', 'Yoru', 'Astra', 
    'Kay/o', 'Chamber', 'Neon', 'Fade', 'Harbor', 
    'Gekko', 'Deadlock','Iso', 'Clove', 'Vyse'
];

module.exports = {
    data: new SlashCommandBuilder()
        .setName('agent')
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
            return interaction.reply('🔙 ¡La lista de agentes se ha reiniciado!');
        }

        if (agentsList.length === 0) {
            return interaction.reply('⚠️¡No hay más agentes disponibles!⚠️ Usa "/ruleta reset" para reiniciar.');
        }

        const elected = agentsList[Math.floor(Math.random() * agentsList.length)];
        agentsList = agentsList.filter(agent => agent !== elected);

        await interaction.reply(`🎉 ¡El agente seleccionado es **${elected}**!`);
    },
};
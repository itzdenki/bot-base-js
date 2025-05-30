const { Events } = require('discord.js');

module.exports = {
  name: Events.InteractionCreate,
  once: false,
  async execute(interaction) {
    if (!interaction.isChatInputCommand()) return;

    const command = interaction.client.commands.get(interaction.commandName);

    if (!command) {
      console.error(`No command matching ${interaction.commandName} was found.`);
      return;
    }

    try {
      await command.execute(interaction);
    } catch (error) {
      console.error(error);
      if (interaction.replied || interaction.deferred) {
        await interaction.followUp({ content: 'Có lỗi khi sử dụng lệnh!', ephemeral: true });
      } else {
        await interaction.reply({ content: 'Có lỗi khi sử dụng lệnh!', ephemeral: true });
      }
    }
  },
};

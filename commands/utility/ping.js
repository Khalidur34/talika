const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("echo")
    .setDescription("Replies with input!")
    .addStringOption((option) =>
      option.setName("enter").setDescription("Enter something")
    ),
  async execute(interaction) {
    await interaction.reply("Pong!");
  },
};

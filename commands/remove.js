const { SlashCommandBuilder, MessageFlags } = require("discord.js");
const { removeItemFromWatchlist } = require("../db.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("remove")
    .setDescription("Remove a movie or show from your watchlist")
    .addStringOption((option) =>
      option
        .setName("title")
        .setDescription("The title of the movie or show to be removed")
        .setRequired(true)
    ),
  async execute(interaction) {
    const itemName = interaction.options.getString("title");
    const userId = interaction.user.id;
    const { error } = await removeItemFromWatchlist(userId, itemName);
    if (error) {
      await interaction.reply(
        "Error! Probably not in the watchlist or Check Spelling."
      );
    } else {
      await interaction.reply({
        content: `${interaction.user.displayName} removed "${itemName}" from the watchlist!`,
        flags: MessageFlags.Ephemeral,
      });
    }
  },
};

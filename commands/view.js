const { SlashCommandBuilder, MessageFlags } = require("discord.js");
const { viewUserSpecificWatchlist } = require("../db.js");
const { watchlistOutput } = require("../helpers/watchlist.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("view")
    .setDescription("See your watchlist"),
  async execute(interaction) {
    const userId = interaction.user.id;
    const { data, error } = await viewUserSpecificWatchlist(userId);
    if (error) {
      await interaction.reply(
        "oops! Something went wrong. Please try again later."
      );
    }
    if (data.length === 0) {
      await interaction.reply(
        "Your watchlist is empty! Use `/add` to add items to your watchlist."
      );
    }

    const watchlistString = watchlistOutput(data);
    await interaction.reply({
      content: watchlistString,
      flags: MessageFlags.Ephemeral, // will send the msg to the user only
    });
  },
};

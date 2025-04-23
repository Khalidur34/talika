const { SlashCommandBuilder, MessageFlags } = require("discord.js");
const { viewUserSpecificWatchlist } = require("../db.js");

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
    let watchlistString = "```\n";
    watchlistString += "| Title                     | Type   |\n";
    watchlistString += "| --------------------------| ------ |\n";

    data.forEach((item) => {
      const name = item.itemName.padEnd(25, " ");
      const type = item.itemType.padEnd(6, " ");
      watchlistString += `| ${name} | ${
        type.charAt(0).toUpperCase() + type.slice(1) // Movie or Show is stored as lowercase in the db
      } |\n`;
    });
    watchlistString += "```"; // End code block

    await interaction.reply({
      content: watchlistString,
      flags: MessageFlags.Ephemeral, // will send the msg to the user only
    });
  },
};

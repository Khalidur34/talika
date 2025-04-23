const { SlashCommandBuilder } = require("discord.js");
const { addItemToWatchlist } = require("../db.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("add")
    .setDescription("Add a movie or show to the watchlist")
    .addStringOption((option) =>
      option
        .setName("type")
        .setDescription("Movie or Show")
        .setRequired(true)
        .addChoices(
          { name: "Movie", value: "movie" },
          { name: "Show", value: "show" }
        )
    )
    .addStringOption((option) =>
      option
        .setName("title")
        .setDescription("The title of the movie or show")
        .setRequired(true)
    ),
  async execute(interaction) {
    const itemType = interaction.options.getString("type");
    const itemName = interaction.options.getString("title");
    const userId = interaction.user.id;
    const guildId = interaction.guild.id;
    const { error } = await addItemToWatchlist(
      userId,
      guildId,
      itemName,
      itemType
    );
    if (error) {
      console.error("Error adding item to watchlist:", error);
      await interaction.reply(
        "There was an error adding the item to the watchlist. Please try again later."
      );
    } else {
      await interaction.reply(
        `${interaction.user.displayName} Added "${itemName}" to the watchlist!`
      );
    }
  },
};

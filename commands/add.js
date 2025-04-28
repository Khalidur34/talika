const { SlashCommandBuilder } = require("discord.js");
const { addItemToWatchlist } = require("../db.js");
const { getSpecificItem } = require("../api/omdb.js");

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
    const userId = interaction.user.id;
    const guildId = interaction.guild.id;
    const itemName = interaction.options.getString("title");
    const itemType = interaction.options.getString("type");
    const itemData = await getSpecificItem(itemName, itemType);

    if (!itemData || itemData.Response === "False") {
      await interaction.reply(`${itemName} not found!`);
      return;
    }
    const { error } = await addItemToWatchlist(
      userId,
      guildId,
      itemData.Title,
      itemType
    );

    if (error.code === "23505") {
      await interaction.reply(
        `${itemData.Title} is already in your watchlist!`
      );
    } else {
      await interaction.reply(
        `${interaction.user.displayName} Added "${itemData.Title}" to the watchlist!`
      );
    }
  },
};

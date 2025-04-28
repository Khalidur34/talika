module.exports = {
  watchlistOutput(data) {
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

    watchlistString += "```";

    return watchlistString;
  },
};

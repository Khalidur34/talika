const { omdbURL, omdbkey } = require("../config.json");
const axios = require("axios");

async function getSpecificItem(name, type) {
  const itemName = name;
  let itemType = type;
  if (itemType === "show") {
    itemType = "series";
  }
  try {
    const response = await axios.get(omdbURL, {
      params: {
        apikey: omdbkey,
        t: itemName,
        type: itemType,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching data from OMDB API:", error);
    return null;
  }
}

module.exports = {
  getSpecificItem,
};

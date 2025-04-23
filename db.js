const { createClient } = require("@supabase/supabase-js");
const { supabaseURL, supabaseKey } = require("./config.json");

const supabase = createClient(supabaseURL, supabaseKey);

async function addItemToWatchlist(userId, guildId, itemName, itemType) {
  await ensureUser(userId);
  await ensureGuild(guildId);
  const { data, error } = await supabase.from("watchlist").insert([
    {
      userId,
      guildId,
      itemName,
      itemType,
    },
  ]);
  return { data, error };
}

async function viewUserSpecificWatchlist(userId) {
  const { data, error } = await supabase
    .from("watchlist")
    .select("itemName, itemType")
    .eq("userId", userId);
  return { data, error };
}

async function removeItemFromWatchlist(userId, itemName) {
  const { data, error } = await supabase
    .from("watchlist")
    .delete()
    .eq("userId", userId)
    .eq("itemName", itemName);
  return { data, error };
}

async function ensureUser(userId) {
  const { error } = await supabase.from("users").upsert({ userId: userId });
  if (error) {
    console.error("Error ensuring user:", error);
  }
}

async function ensureGuild(guildId) {
  const { error } = await supabase.from("guilds").upsert({ guildId: guildId });
  if (error) {
    console.error("Error ensuring guild:", error);
  }
}

module.exports = {
  addItemToWatchlist,
  viewUserSpecificWatchlist,
  removeItemFromWatchlist,
};

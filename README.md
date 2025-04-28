# Talika: Discord Watchlist Bot

This JavaScript-based Discord bot can manage private and public watchlists across Discord servers. The bot is built using the discord.js api wrapper along with Supabase for database management.

## Features

- Add and Remove Movie or TV Show.
- View Personal Watchlist.
- View Server Watchlist.
- Slash Commands for Accessiblity.

## Setup

Follow these steps to set up and run the bot:

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/Khalidur34/talika.git
   cd talika
   ```
2. **Install Dependencies**:
   ```bash
   npm install
   ```
3. **Configure and Rename `example.config.json`**:
   ````bash
   "clientId": "your-client-id",
   "token": "your-bot-token",
   "supabaseURL": "supabase-url",
   "supabaseKey": "supabase-key",
   "omdbkey": "your-omdbkey",
   "omdbURL": "http://www.omdbapi.com/"```
   ````
4. **Run**
   ```bash
   npm start
   ```

## Future Enhancements

- Integration with OMDb API for searches based on mood, genre, and watch time.
- View trendy watchlists from different servers(anonymous).

## Thank You

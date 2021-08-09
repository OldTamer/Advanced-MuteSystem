const {
  botSettings,
  otherSettings,
  mongoSettings,
} = require("./settings.json");
require("dotenv").config();
const express = require("express")();
const port = 3000 || 9999;
express.use("/", (req, res) => {
  res.send(`Bot Made With Tamer#0100`);
});
express.listen(port, () => {
  console.log("Project is listening.");
});
const DiscordJS = require("discord.js");
const client = new DiscordJS.Client();
const wokcommands = require("wokcommands");
client.on("ready", function () {
  try {
    console.log(client.users.cache.get(otherSettings.owner).tag);
  } catch (error) {
    /**/
  }
  new wokcommands(client, {
    commandsDir: "commands",
    showWarns: false,
  })
    .setBotOwner(otherSettings.owner)
    .setPrefix(botSettings.prefix)
    .setDisplayName(client.user.username)
    .setMongoPath(
      mongoSettings.mongoPath.replace("<password>", mongoSettings.password)
    );
});
client.login(process.env.botToken);

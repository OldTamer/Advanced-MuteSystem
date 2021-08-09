const { Message, MessageEmbed } = require("discord.js");
const Schema = require("../models/Utils/setMute");
module.exports = {
  name: "setmute",
  description: "set's mute role",
  category: "moderation",
  permissions: ["MUTE_MEMBERS"],
  minArgs: 1,
  expectedArgs: "<Role>",

  callback: async ({ message, args }) => {
    try {
      let muteRole =
        message.mentions.roles.first() ||
        message.guild.roles.cache.get(args[0]);
      module.exports = muteRole;

      let data;
      data = await Schema.findOne({ Guild: message.guild.id });
      if (!data) {
        let newData = await Schema.create({
          Guild: message.guild.id,
          Role: muteRole.id,
        }).save();
      } else {
        await Schema.findOneAndUpdate({
          Guild: message.guild.id,
          Role: muteRole.id,
        });
      }
      message.channel.send(`**Mute Role Has Been Updated**`);
    } catch (err) {
      /**/
    }
  },
};

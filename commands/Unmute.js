const { Message, MessageEmbed } = require("discord.js");
const Schema = require("../models/Utils/setMute");
module.exports = {
  name: "unmute",
  description: "Unmute a member",
  category: "moderation",
  permissions: ["MUTE_MEMBERS"],
  minArgs: 1,
  expectedArgs: "<Member> <Mute Number>",

  callback: async ({ message, args }) => {
    try {
      let unmutedMember =
        message.mentions.members.first() ||
        message.guild.members.cache.get(args[0]);
      await Schema.findOne(
        { Guild: message.guild.id, Muted: unmutedMember.id },
        async (err, data) => {
          if (err) {
            /**/
          }
          if (data) {
            let number = parseInt(args[1]) - 1;
            data.Information.splice(number, 1);
            message.channel.send(`**${unmutedMember} Has Been Unmuted**`);
            data.save();
          } else {
            message.channel.send(
              "**This Person Have No Mutes On This Server**"
            );
          }
        }
      );
      let data = await Schema.findOne({ Guild: message.guild.id });

      unmutedMember.roles.remove(data.Role);
    } catch (err) {
      /**/
    }
  },
};

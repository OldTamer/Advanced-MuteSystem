const { Message, MessageEmbed } = require("discord.js");
const Schema = require("../models/Utils/setMute");
module.exports = {
  name: "mute",
  description: "Mute a member",
  category: "moderation",
  permissions: ["MUTE_MEMBERS"],
  minArgs: 1,
  expectedArgs: "<Member>",

  callback: async ({ message, args }) => {
    try {
      let mutedMember =
        message.mentions.members.first() ||
        message.guild.members.cache.get(args[0]);
      let reason = args.slice(1).join(" ") || "No Reason";
      await Schema.findOne(
        { Guild: message.guild.id, Muted: mutedMember.id },
        async (err, data) => {
          if (err) {
            /**/
          }

          if (!data) {
            const muteRole = require("./SetMute");
            data = new Schema({
              Guild: message.guild.id,
              Muted: mutedMember.id,
              Role: muteRole.id,
              Information: [
                {
                  Moderator: message.author.id,
                  Reason: reason,
                },
              ],
            });
          } else if (data) {
            const object = {
              Moderator: message.author.id,
              Reason: reason,
            };
            data.Information.push(object);
          }
          data.save();
        }
      );
      let data = await Schema.findOne({ Guild: message.guild.id });

      mutedMember.roles.add(data.Role).then(() => {
        message.guild.channels.cache.forEach((ch) => {
          ch.updateOverwrite(data.Role, {
            SEND_MESSAGES: false,
            ADD_REACTIONS: false,
          });
        });
      });
      message.channel.send(`**${mutedMember} Has been muted**`).then((msg) => {
        msg.delete({ timeout: 10000 });
      });
    } catch (err) {
      /**/
    }
  },
};

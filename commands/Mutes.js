const { Message, MessageEmbed } = require("discord.js");
const Schema = require("../models/Utils/setMute");
module.exports = {
  name: "mutes",
  description: "display the mutes of user",
  category: "moderation",
  permissions: ["ADMINISTRATOR"],
  minArgs: 1,
  expectedArgs: "<Member> [Reason]",

  callback: async ({ message, args }) => {
    try {
      let mutedMember =
        message.mentions.members.first() ||
        message.guild.members.cache.get(args[0]);
      let reason = args.slice(1).join(" ");
      await Schema.findOne(
        { Guild: message.guild.id, Muted: mutedMember.id },
        async (err, data) => {
          if (err) {
            /**/
          }
          if (data) {
            message.channel.send(
              new MessageEmbed()
                .setColor("green")
                .setTitle(`${mutedMember.user.username} mutes`)
                .setDescription(
                  data.Information.map(
                    (w, i) =>
                      `\`#${i + 1}\` : **Moderator** : By <@${
                        message.guild.members.cache.get(w.Moderator).id
                      }>\n**Reason** : ${w.Reason}`
                  )
                )
            );
          } else {
            message.channel.send(`**This Member Has Not Muted Yet..**`);
          }
        }
      );
    } catch (err) {
      /**/
    }
  },
};

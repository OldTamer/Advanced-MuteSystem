const Schema = require("../models/Utils/setMute");
module.exports = {
  name: "delete-mutes",
  aliases: ["delm"],
  category: "moderation",
  description: "delete all mutes",
  permissions: ["ADMINISTRATOR"],
  callback: async ({ message, args }) => {
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
          await Schema.findOneAndDelete({
            Muted: unmutedMember.user.id,
            Guild: message.guild.id,
          });
          message.channel.send(`**Removed All ${unmutedMember} Mutes.**`);
        } else {
          message.channel.send("**This Person Have No Mutes On This Server**");
        }
      }
    );
  },
};

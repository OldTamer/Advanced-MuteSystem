/**
 * @Info This Code Created By Tamer From Developer Support Server.
 */
const mongoose = require("mongoose");
const muteSchema = new mongoose.Schema({
  Guild: String,
  Role: String,
  Muted: String,
  Information: Array,
});
module.exports = mongoose.model("setmute", muteSchema);

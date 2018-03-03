const Discord = require("discord.js");
const client = new Discord.Client();

const config = require("./config.json")
const commands = require("./commands.js")

var AsciiTable = require('ascii-table')


client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
  if (msg.content.startsWith('.')) {
    const command = msg.content.slice(1).split(' ')[0]
    if (commands.hasOwnProperty(command)) {
      commands[command].execute(msg, msg.content.split(' ').slice(1))
    } else {
      msg.reply("Unrecognized command. Run `.help` for help")
    }
  }
});

client.login(config.token);
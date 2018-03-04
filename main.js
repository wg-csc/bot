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

  if (msg.content.includes("$wiki")) {
    var links = msg.content.match(/\$wiki(?:\/[A-Za-z0-9-]+)?/g)
    links.forEach(link => {
      const url = link.replace(/\$wiki/g, "https://github.com/wg-csc/wiki/wiki")
      msg.channel.send(url)
    })
  }
});

client.login(config.token);
const Discord = require("discord.js");

var AsciiTable = require('ascii-table')
var crypto = require('crypto');

var xkcd = require('xkcd');

const commands = {
    help: {
        description: 'List all commands',
        execute: (msg, args) => {
            var table = new AsciiTable()
            Object.keys(commands).forEach(command => {
                table.addRow(command, commands[command].description)
            })
            msg.reply(table.toString(), {
                code: true
            })
        }
    },
    sha256: {
        description: '',
        execute: (msg, args) => {
            const text = args.join(' ')
            const hash = crypto.createHash('sha256').update(text).digest('hex');
            msg.reply(hash, {
                code: true
            })
        }
    },
    xkcd: {
        description: '',
        execute: (msg, args) => {
            function xkcd_handler(data) {
                msg.channel.send(new Discord.RichEmbed()
                    .setTitle(`#${data.num}: ${data.title}`)
                    .setImage(data.img)
                    .setFooter(data.alt)
                    .setTimestamp(new Date(data.year, data.month - 1, data.day))
                    .setURL(`https://xkcd.com/${data.num}`))
            }

            if (args) {
                xkcd(parseInt(args[0]), xkcd_handler);
            } else {
                xkcd(xkcd_handler);
            }
        }
    }
}

module.exports = commands
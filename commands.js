const Discord = require("discord.js");

var AsciiTable = require('ascii-table')
var crypto = require('crypto');

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
}

module.exports = commands
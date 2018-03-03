const Discord = require("discord.js");

var AsciiTable = require('ascii-table')
var crypto = require('crypto');

function alice(text) {
    return new Discord.RichEmbed().setAuthor(
            "Alice",
            'https://www.explainxkcd.com/wiki/images/e/e5/Megan.png')
        .setDescription(text)
}

function bob(text) {
    return new Discord.RichEmbed().setAuthor(
            "Bob",
            'https://www.explainxkcd.com/wiki/images/4/49/Hairy.png')
        .setDescription(text)
}

const commands = {
    help: {
        name: 'help',
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
        name: 'sha256',
        description: '',
        execute: (msg, args) => {
            const text = args.join(' ')
            const hash = crypto.createHash('sha256').update(text).digest('hex');
            msg.reply(`${hash}`, {
                code: true
            })
        }
    },
    pk: {
        name: 'pk',
        description: 'Get a tutorial on public key crypto',
        execute: (msg, args) => {
            msg.reply("A tutorial has been send privately.")

            msg.author.send(
                "Explanation of public key crypto\n" +
                "---\n" +
                "Alice wants to send a message to Bob.\n" +
                "Bob sends an open lock to Alice. Bob has the key to this lock.\n" +
                "Bob uses the open lock to lock a message in a box and sends the locked box to Alice.\n" +
                "Alice uses her key to unlock the box.\n" +
                "---\n" +
                "This is called *public key cryptography* because it has a public component, in this case the open lock.\n" +
                "In the crypto world, the open lock would be called Bob's *public key* and his private key would be called his—ahem—*private key* :wink:\n" +
                "---");
            msg.author.send(alice("Hey, Bob, could you please send me an open lock you have the key to?")
                .addField("inventory", ":notepad_spiral:"));
            msg.author.send(bob(
                    "Of course!")
                .addField("sent", ":unlock:")
                .addField("inventory", ":unlock: :key:"))
            msg.author.send(alice('')
                .addField("received", ":unlock:")
                .addField("operations",
                    ":notepad_spiral: → :briefcase:\n\n" +
                    ":unlock: + :briefcase: = [ :briefcase: :lock: ]")
                .addField("sent", "[ :briefcase: :lock: ]")
                .addField("inventory", ":notepad_spiral:"));
            msg.author.send(bob('')
                .addField("received", "[ :briefcase: :lock: ]")
                .addField("operations",
                    "[ :briefcase: :lock: ] + :key: → :briefcase: :unlock:\n\n" +
                    ":briefcase: → :notepad_spiral:")
                .addField("output", ":notepad_spiral:")
                .addField("inventory", ":unlock: :key:"));
        }
    }
}

module.exports = commands
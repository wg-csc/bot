const Discord = require('discord.js')

var AsciiTable = require('ascii-table')
var crypto = require('crypto')

var xkcd = require('xkcd')
const octokit = require('@octokit/rest')()

const commands = {
  help: {
    description: 'List all commands',
    execute: (msg, args) => {
      var table = new AsciiTable()
      Object.keys(commands).forEach(command => {
        table.addRow(command, commands[command].description)
      })
      msg.channel.send(table.toString(), {
        code: true
      })
    }
  },
  sha256: {
    description: '',
    execute: (msg, args) => {
      const text = args.join(' ')
      const hash = crypto.createHash('sha256').update(text).digest('hex')
      msg.reply(hash, {
        code: true
      })
    }
  },
  xkcd: {
    description: '',
    execute: (msg, args) => {
      function xkcdHandler (data) {
        msg.channel.send(new Discord.RichEmbed()
          .setTitle(`#${data.num}: ${data.title}`)
          .setImage(data.img)
          .setFooter(data.alt)
          .setTimestamp(new Date(data.year, data.month - 1, data.day))
          .setURL(`https://xkcd.com/${data.num}`))
      }

      if (args) {
        xkcd(parseInt(args[0]), xkcdHandler)
      } else {
        xkcd(xkcdHandler)
      }
    }
  },
  wiki: {
    description: 'Get a link to the club wiki',
    execute: (msg, args) => {
      msg.channel.send('The club wiki is at https://github.com/wg-csc/wiki/wiki')
    }
  },
  echo: {
    description: '',
    execute: (msg, args) => {
      msg.channel.send(args.join(' '))
    }
  },
  announce: {
    description: '',
    execute: (msg, args) => {
      const link = args[0]
      const [owner, repo,, sha] = link.split('/').slice(3)
      console.log(owner, repo, sha)
      octokit.gitdata.getCommit({
        owner,
        repo,
        sha
      }).then(info => {
        msg.channel.send(new Discord.RichEmbed()
          .setTitle(info.data.message)
          .setURL(link)
          .setTimestamp(new Date(info.data.committer.date))
          .setAuthor(info.data.author.name)
          .setColor(info.data.verification.verified ? 'green' : 'grey'))
      })
    }
  }
}

module.exports = commands

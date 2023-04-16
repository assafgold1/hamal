const fetch = require('node-fetch');
import fetch from ('node-fetch');
const Discord = require('discord.js');
const client = new Discord.Client();
const CHANNEL_ID = '1087408369620488334';
let interval;

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', async message => {
  if (message.content === '!start') {
    interval = setInterval(async () => {
      try {
        const response = await fetch('https://hamal.co.il/main/api/articles');
        const data = await response.json();
        const latestArticle = data.articles[0];

        const embed = new Discord.MessageEmbed()
          .setTitle(latestArticle.title)
          .setDescription(latestArticle.description)
          .setURL(latestArticle.link)
          .setThumbnail(latestArticle.image);

        client.channels.cache.get(CHANNEL_ID).send(embed);
      } catch (err) {
        console.error(err);
      }
    }, 60000);
  } else if (message.content === '!stop') {
    clearInterval(interval);
  }
});

client.login('MTA4OTc3MzU5MzQxMzU1ODM1Mg.G1JJ1Y.k-q98dT2IRlsZneyjUuCXzPAB3N4YSDijaYXfo');

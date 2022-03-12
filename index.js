const { Client, Intents, Permissions, MessageEmbed } = require("discord.js");
const config = require('./config.js')
const skoy = require('skoy')
const client = new Client({
    intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES]
});
const token = config.token;
const prefix = config.prefix;

function skoyify(message) {
    let ans = skoy.convert(message)
    return ans
}


client.on("ready", () => {
    client.user.setActivity("ซ๊อณธ๊๊ญผริ๊บ่๊ว", { type: 'PLAYING' });
    console.log(`Logged in. I'm ${client.user.tag}!`);
});

client.on("guildCreate", guild => {
    let channel = guild.systemChannel
    let embed = new MessageEmbed()
        .setTitle("ษวัษดลีร์ เลาเป็ฯสก๊อยป์")
        .setURL("https://github.com/gxjakkap/skoybot")
        .setColor('#d21fff')
        .setDescription(`เลาเเปลงฆ๊อคว๊ฒเเกเป็นพ๊ษ๊สก๊อยไฎ๊น๊ เเค่ภิฒพ์ ${config.prefix}skoy ฏ๊มฎ๊วญฆ๊ฮคว๊ฒธิ๊ฆ์เเกญั๊ห์ขไฎ๊ ม่ฒ๊ ม่เป็นสก๊อยกัลซ์ษิขร๊`)
        .setFooter({ text: "Made by GuntxJakka" })
    channel.send({ embeds: [embed] })

})

client.on("messageCreate", message => {
    if (message.author.bot || message.content.includes("@here") || message.content.includes("@everyone")) return;

    if (message.type == 'REPLY' && message.mentions.has(client.user.id)) {
        message.fetchReference()
            .then(originalMsg => {
                if (originalMsg.author.bot) return;
                let text = originalMsg.content;
                /**gode(text)
                    .then(response => {
                        console.log(`[${originalMsg.guild.name}] ${originalMsg.author.username} said: ${response.results}`);
                        message.channel.send(`${originalMsg.author.username} said: ${response.results}`)
                    })
                    .catch(err => {
                        message.channel.send("Error");
                        console.log(err)
                    });**/
                let returnmessage = skoyify(text)
                originalMsg.reply(returnmessage)
            })
    }

    if (message.content.indexOf(prefix) !== 0) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    if (command === 'help') {
        message.channel.send(`>>> **คำษั่ง** \n **${prefix}skoy** <ฆ๊ฮคว๊ฒ> \n เเปลงฆ๊ฮคว๊มเป็ฯพ๊ษ๊สก๊อย`);
    }
    if (command === 'skoy') {
        let text = args.join(" ");
        if (text === "") {
            message.channel.send("ใษ่ฆ๊ฮคว๊มก่ฮฯ!");
        } else {
            let returnmessage = skoyify(text)
            message.reply(returnmessage)
        }
    }
});

client.login(token);
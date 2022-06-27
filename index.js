const { Telegraf, Markup } = require('telegraf');
const pack = require('packagescrapers')
const tiktok = require('tiktok-scraper-without-watermark')
const { exec } = require("child_process");
const axios = require('axios')
const bot = new Telegraf("5311910608:AAHs6Mxiw6efKEI1UEIIGW-_cW9fMQyihQQ")

bot.command('start', (ctx) => ctx.reply("Hi "+ctx.from.username+" type /help to see bot menu 😁", { ...Markup.inlineKeyboard([ Markup.button.url('Developer', 't.me/scerviez') ]) } ));

bot.command('help', (ctx)=>{                                                                                                                                                                                                                                 
    ctx.reply('Command Menu\n/start -> start the bot\n/help -> to see command from bot\n/go -> search on google\n/img -> search image\n/ly -> search lyrics from genius.com\n/npm -> to search package at npmjs.com\n/tt -> to download video from tiktol without watermark\n/fdb -> send your feedback or suggestion for bot :)')
})

bot.command('go', (msg)=>{
    const input = msg.message.text
    let inputArray = input.split(" ");
    inputArray.shift();
              pesan = inputArray.join(" ");  
    axios.get('https://apiapi.xlaaf.repl.co/search?q='+pesan)
    .then(res => {
         const me = res.data.data
         const hai = me[Math.floor(Math.random() * (me.length))] 
         const judul = hai.title
         const link = hai.link
         const desk = hai.desk
         ctx.reply(`Found From Keywords : ${pesan}\n${judul}\nUrl: ${link}\nDesc: ${desk}`)
       })
})

bot.command('pin', (ctx)=>{
  const admin = ctx.telegram.getChatMember(ctx.chat.id, ctx.message.from.id) 
  ctx.reply(admin)
})


bot.command('fdb', (ctx)=>{                                                                                                                                                                                                                                 
    const pesan = ctx.message.message_id
    ctx.telegram.forwardMessage(1716000402, ctx.from.id, pesan)
    ctx.reply('Your Feedback Has Been Sended')
})

bot.command('tt', (ctx)=>{
    const input = ctx.message.text
    let inputArray = input.split(" ");
    inputArray.shift();
              pesan = inputArray.join(" ");  
   tiktok.tiktokdownload(pesan)
    .then(res => {
         ctx.replyWithVideo(res.nowm)
   })
})

bot.command('img', (msg)=>{
    const input = msg.message.text
    let inputArray = input.split(" ");
    inputArray.shift();
              pesan = inputArray.join(" ");            
              axios.get('https://adadad.xlaaf.repl.co/cari?q='+pesan)
              .then(res => {
    const g = res.data.img
    msg.telegram.sendPhoto(msg.chat.id, g)
            })
})

bot.command('ly', (msg)=>{
    const input = msg.message.text
    let inputArray = input.split(" ");
    inputArray.shift();
              pesan = inputArray.join(" ");            
              axios.get('https://lyrics-api.xlaaf.repl.co/search?q='+pesan)
              .then(res => {
    const lt = res.data.data
    msg.reply(lt)
            })
})

bot.command('npm', (msg)=>{
    let input = msg.message.text
     let inputArray = input.split(" ")
    inputArray.shift()
    pesan = inputArray.join(" ")
   pack.npm(pesan).then(ok => {
      const res = ok[Math.floor(Math.random() * (ok.length))]
        const title = res.title
        const link = res.link
    msg.reply(`Title: ${title} \nUrl: ${link}`)
   })
})

bot.command('sh', (ctx)=>{
    let input = ctx.message.text
     let inputArray = input.split(" ")
    inputArray.shift()
    pesan = inputArray.join(" ")
    exec(pesan, (error, stdout, stderr) => {
        if (error) {
            ctx.reply(`error: ${error.message}`);
            return;
        }
        if (stderr) {
            ctx.reply(`stderr: ${stderr}`);
            return;
        }
        ctx.reply(`stdout: ${stdout}`);
    })
});

bot.command('sticker', (msg)=>{
    let input = msg.message.text
     let inputArray = input.split(" ")
    inputArray.shift()
    pesan = inputArray.join(" ")
    const headers = {
    'Content-Type': 'application/json',
    'user-agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_7_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.1.2 Mobile/15E148 Safari/604.1',
    };
   axios.get('https://stickers-tele-api.xlaaf.repl.co/search?q='+pesan).then(bu => {
      const ok = res.data
      const res = ok[Math.floor(Math.random() * (ok.length))]
        const title = res.data.title
        const link = res.data.link
    msg.reply(`Sticker Name: ${title} \nUrl: ${link}`)
   })
})

console.log("Running...")

bot.launch()


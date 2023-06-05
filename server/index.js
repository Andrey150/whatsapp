const whatsAppClient = require("@green-api/whatsapp-api-client");
const express = require("express");
const config = require("config");
const mongoose = require("mongoose");
const authRouter = require("./routes/auth.routes");
const corsMiddleware = require("./middleware/cors.middleware")

const app = express();
const PORT = config.get("serverPort");

app.use(corsMiddleware)
app.use(express.json())
app.use("/api/auth", authRouter)

const restAPI = whatsAppClient.restAPI(({
  idInstance: '1101822998',
  apiTokenInstance: '01c742cead704c9d95daa9320fe010a11ba7d5eaf8bc4232bd'
}))

const now = new Date().toString();

const start = async () => {
  try {
    await mongoose.connect(config.get("dbUrl"));



    app.listen(PORT, () => {
      // restAPI.message.sendMessage("79519987806@c.us", null, `start server ${now}`)
      //   .then((data) => {
      //     console.log('data', typeof data);
      //     console.log('now', typeof now);
      //   }) ;
      console.log(`start server on ${PORT} in ${now}`)
    })

  } catch(e) {
    console.error('ошибка сервера', e);
  }
}

start()

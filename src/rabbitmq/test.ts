import * as amqp from "amqplib";

async function producer() {
  try {
    const connection = await amqp.connect("amqp://11111:11111@localhost:5672");
    const channel = await connection.createChannel();
    let queue = "hello";
    let msg = "hello world";
    channel.assertQueue(queue, { durable: false });
    for (let i = 0; i < 1000; i++) {
      channel.sendToQueue(queue, Buffer.from(msg + i));
      console.log(" [x] Sent %s", msg);
    }
  } catch (error) {
    console.log(error);
  }
}

producer();

async function recive() {
  try {
    const connection = await amqp.connect("amqp://11111:11111@localhost:5672");
    const channel = await connection.createChannel();
    channel.prefetch(5); // 5 ta xabarni o'qib oladi
    channel.consume("hello", (message) => {
      if (message !== null) {
        setTimeout(() => {
          channel.ack(message); // tasdiqlangan xabarni o'chirish
        }, 2000);
        console.log(message.content.toString());
      }
    });
  } catch (error) {
    console.log(error);
  }
}

recive();

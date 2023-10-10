import * as amqp from "amqplib";

async function producer() {
  const connection = await amqp.connect("amqp://11111:1111@localhost:5672"); // amqp://username:password@host:port
  const channel = await connection.createChannel(); // create channel
  channel.assertQueue("order", {
    durable: true,
  }); // create queue
  channel.sendToQueue("order", Buffer.from("hello world"), {
    persistent: true,
  }); // send message to queue
  console.log("message sent");
}

producer();

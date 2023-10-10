import * as amqp from "amqplib";

async function consumer() {
  const connection = await amqp.connect("amqp://11111:1111@localhost:5672");
  const channel = await connection.createChannel();
  channel.assertQueue("order", {
    durable: true,
  });
  channel.prefetch(1); //  consumerga 1ta message berish
  channel.consume(
    "order",
    (message) => {
      console.log(`Received ${message?.content.toString()}`);
      channel.ack(message as amqp.Message);
    },
    {
      noAck: false, // agar message tasdiqlanmasa boshqa consumerlarga yuborilmaydi
    //   noAck: true, // bu xabarni avtomatik tasdiqlaydi navbatdan o'chirib yuboradi
    }
  );
}

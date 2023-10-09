import * as amqp from "amqplib";

class RabbitMqService {
  private conn: amqp.Connection | null = null;
  private channel: amqp.Channel | null = null;

  async producer(message: string) {
    if (!this.conn) {
      this.conn = await amqp.connect("amqp://11111:11111@localhost:15672",{
        
      });
    }
    if (!this.channel) {
      this.channel = await this.conn.createChannel();
    }`  `
    await this.channel.assertQueue("test", {
      durable: false,
    });
    this.channel.ackAll();
    await this.channel.sendToQueue("test", Buffer.from(message));
    console.log("Message sent");
  }

  async consumer() {
    if (!this.conn) {
      this.conn = await amqp.connect("amqp://localhost");
    }
    if (!this.channel) {
      this.channel = await this.conn.createChannel();
    }
    await this.channel.assertQueue("test", {
      durable: false,
    });
    await this.channel.consume("test", (message) => {
    setTimeout(() => {
        console.log("Message received: " + message?.content.toString());
    }, 2000);
    });
  }
}


let rabbitMqService = new RabbitMqService();
rabbitMqService.producer("Hello World2!");
rabbitMqService.consumer();
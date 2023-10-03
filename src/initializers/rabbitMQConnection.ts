import amqp from 'amqplib';

class RabbitMQ {
  public connection: any;
  constructor() {
    this.connection = this.connect();
  }

  public connect() {
    // return amqp.connect({
    //   protocol: process.env.AMQP_PROTOCOL,
    //   hostname: process.env.AMQP_HOST_NAME,
    //   port: parseInt(process.env.AMQP_PORT, 10),
    //   username: process.env.AMQP_USERNAME,
    //   password: process.env.AMQP_PASSWORD,
    // });
  }
}

export default new RabbitMQ();

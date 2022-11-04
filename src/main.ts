import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { MqttModule} from "./app.module";

async function bootstrap() {
  const app = await NestFactory.createMicroservice(MqttModule, {
    transport : Transport.MQTT,
    options: {
      subscribeOptions: { qos : 1 },
      url: 'mqtt://broker.hivemq.com',
    },
  });
  await app.listen();
}
bootstrap();

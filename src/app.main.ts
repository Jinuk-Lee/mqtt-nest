import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';
//import {NestExpressApplication} from "@nestjs/platform-express";
//import {http모듈} from './http모듈';
//해당 메인파일은 Client의 역할을 함.
//즉 mqtt서버에 접속해서 메세지를 읽고 전달하는 역할을 하게 됨.
async function bootstrap() {
  const app = await NestFactory.createMicroservice(AppModule, {
    transport: Transport.MQTT,
    options: {
      hostname: 'broker.hivemq.com',
      port: 1883,
      protocol: 'mqtt',
      // subscribeOptions: {qos:0},
      // url: 'mqtt://test.mosquitto.org:1883',
    },
  });
  app.listen();
}

bootstrap();

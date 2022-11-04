import {Module} from '@nestjs/common';
import {ClientsModule, Transport} from '@nestjs/microservices';
import {AppController} from "./app.controller";
import {AppService} from "./app.service";

@Module({
  imports: [
      ClientsModule.register([
        {
          name:'TEST_CLIENT',
          transport: Transport.MQTT,
          options: {
            subscribeOptions:{ qos : 1 },
            url: 'mqtt://broker.hivemq.com',
          }
        },
      ]),
  ],
  controllers: [AppController],
  providers:[AppService],
})
export class AppModule {}

export class MqttModule {
}
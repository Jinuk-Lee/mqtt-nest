import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {ClientsModule, Transport} from '@nestjs/microservices';

//mqtt서버의 기본 접속 정보를 등록하는 곳
//아이디와 비밀번호를 등록해줍니다.

@Module({
  imports: [
    ClientsModule.register([
      {
        name:'TEST_CLIENT',
        transport:Transport.MQTT,
        options:{
          hostname: 'broker.hivemq.com',
          port: 1883,
          protocol: 'mqtt'
          // subscribeOptions : {qos:0},
          // url: 'mqtt://test.mosquitto.org:1883',
          // clientId: 'id',
          // password:'password'
        }
      }
    ])
  ],
  controllers: [AppController],
  providers: [AppService],

})
export class AppModule {}

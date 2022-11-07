import { Controller, Inject } from '@nestjs/common';
import {
  ClientProxy,
  MessagePattern,
  Payload as pd,
} from '@nestjs/microservices';
import { take } from 'rxjs';

//실제 연동하는 부분으로 메세지를 송신하는 부분
@Controller()
export class AppController {
  constructor(@Inject('TEST_CLIENT') private client: ClientProxy) {
    //Publisher 구현 코드
    setInterval(() => {
      //3초 마다 메세지를 발송하도록 함.
      const data = {
        sensor_name: 'Temperature',
        location: 'N5',
        value: Math.floor(Math.random() * 35),
      };
      this.client.send('World', data).pipe(take(2)).subscribe(); //data를 전송할 주제 등록
    }, 3000);
  }

  //Subscriber 구현 코드
  @MessagePattern('smartgreen') //구독하는 주제 1
  sumData(@pd() message) {
    const [sName, loc, tmp] = message.toString().split(',');
    const data = {
      sensor_name: sName,
      location: loc,
      value: tmp,
    };
    const sensors = JSON.stringify(data);
    console.log(sensors);
  }

  @MessagePattern('American') //구독하는 주제 2
  고유받기(@pd() data) {
    console.log(data);
  }
}

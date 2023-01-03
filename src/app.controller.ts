import { Controller, Inject, Post } from '@nestjs/common';
import {
  ClientProxy,
  MessagePattern,
  Payload as pd,
} from '@nestjs/microservices';
import { catchError, take } from 'rxjs';

//실제 연동하는 부분으로 메세지를 송신하는 부분
@Controller()
export class AppController {
  constructor(@Inject('TEST_CLIENT') private client: ClientProxy) {
    //Publisher 구현 코드
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const Client = require('@nestjs/microservices').Client;

    setInterval(() => {
      //3초 마다 메세지를 발송하도록 함.
      const message = {
        sensor_name: 'Temperature',
        location: 'N5',
        value: Math.floor(Math.random() * 35),
      };
      this.client.send('smart-green', message).pipe(take(2)).subscribe(); //data를 전송할 주제 등록
    }, 3000);
  }

  //Subscriber 구현 코드
  @MessagePattern('smart-green') //구독하는 주제 1
  sensor_data(@pd() message) {
    console.log(message);
    const [sName, loc, tmp] = message.toString().split(',');
    const data = {
      sensor_name: sName,
      location: loc,
      value: tmp,
    };

    const sensors = JSON.stringify(data);

    //console.log(sensors);

    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const axios = require('axios');
    axios
      .post('http://localhost:3000/user', { sensors })
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });
  }
}

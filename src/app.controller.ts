import {Controller, Inject, Post} from '@nestjs/common';
import {ClientProxy, Ctx, MessagePattern, MqttContext, Payload,Payload as pd} from "@nestjs/microservices";
import {take} from "rxjs";
import {AppService} from "./app.service";
//실제 연동하는 부분으로 메세지를 송신하는 부분
@Controller()
export class AppController {
    constructor(@Inject('TEST_CLIENT') private client: ClientProxy) {
        setInterval(() => { //3초 마다 메세지를 발송하도록 함.
            const data = {sensor_name:'Temperature',location:'N5',value: Math.floor(Math.random()*35)};
            this.client.send('World', data).pipe(take(2)).subscribe();
        }, 3000);
        // setTimeout(() => { //3초 뒤에 메세지를 발송하도록 함.
        //     const data = {number: Math.random(), text: AppController.name};
        //     this.client.send('Korean', data).pipe(take(1)).subscribe();
        // }, 3000);
    }

    @MessagePattern('World') //구독하는 주제 1
    모두받기(@pd() data) {
        console.log(data);
    }

    @MessagePattern('American') //구독하는 주제 2
    고유받기(@pd() data) {
        console.log(data);
    }


    // @MessagePattern('ftf-input')
    // sumData(@Payload() payload: number[], @Ctx() context: MqttContext) {
    //     console.log(`---NEW Message ${context.getTopic()}---`);
    //     console.log("Payload: ", payload);
    //     console.log("Packet: ", context.getPacket());
    //     this.appService.sumDataService(payload);
    //
    // }
    //
    // @MessagePattern('ftf-output')
    // logData(@Payload() payload: string, @Ctx() context: MqttContext) {
    //     console.log(`---NEW Message ${context.getTopic()}---`);
    //     console.log("Payload: ", payload);
    //     console.log("Packet: ", context.getPacket());
    //     return payload + `response from logData() in -t ${context.getTopic()}`;
    // }

}


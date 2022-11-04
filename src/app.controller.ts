import {Controller, Inject} from '@nestjs/common';
//import {AppService} from './app.service';
import {ClientProxy, Ctx, MessagePattern, MqttContext, Payload as pd} from "@nestjs/microservices";
import {take} from "rxjs";

@Controller()
export class AppController {
    constructor(@Inject('TEST_CLIENT') private client: ClientProxy) {
        setTimeout(() => { //3초 뒤에 메세지를 발송하도록 함.
            const data = {number: Math.random(), text: AppController.name};
            this.client.send('Korean', data).pipe(take(1)).subscribe();
        }, 3000);
    }

    @MessagePattern('World')//구독하는 주제 1
    모두받기(@pd() data) {
        console.log(data);
    }

    @MessagePattern('American')//구독하는 주제 2
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


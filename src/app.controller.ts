import {Controller} from '@nestjs/common';
import {AppService} from './app.service';
import {Ctx, MessagePattern, MqttContext, Payload} from "@nestjs/microservices";

@Controller()
export class AppController {
    constructor(private readonly appService: AppService) {
    }

    @MessagePattern('ftf-input')
    sumData(@Payload() payload: number[], @Ctx() context: MqttContext) {
        console.log(`---NEW Message ${context.getTopic()}---`);
        console.log("Payload: ", payload);
        console.log("Packet: ", context.getPacket());
        this.appService.sumDataService(payload);

    }

    @MessagePattern('ftf-output')
    logData(@Payload() payload: string, @Ctx() context: MqttContext) {
        console.log(`---NEW Message ${context.getTopic()}---`);
        console.log("Payload: ", payload);
        console.log("Packet: ", context.getPacket());
        return payload + `response from logData() in -t ${context.getTopic()}`;
    }

}


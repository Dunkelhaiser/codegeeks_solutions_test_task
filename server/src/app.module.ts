import { APP_PIPE, APP_INTERCEPTOR  } from '@nestjs/core';
import { ZodValidationPipe, ZodSerializerInterceptor  } from 'nestjs-zod';
import { Module } from "@nestjs/common";
import { EventsModule } from "./events/events.module";

@Module({
    imports: [EventsModule],
    controllers: [],
    providers: [{
        provide: APP_PIPE,
        useClass: ZodValidationPipe
    }, {
        provide: APP_INTERCEPTOR,
        useClass: ZodSerializerInterceptor
    }],
})
export class AppModule {}

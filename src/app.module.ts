import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConsultoraMutualModule } from './consultora-mutual/consultora-mutual.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ConsultoraMutualModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

// npm install --force  --save @nestjs/axios axios

import { Module } from '@nestjs/common';
import { HttpModule, HttpService } from '@nestjs/axios';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NumVerifyService } from './num-verify/num-verify.service';
import { PhoneNumInfoEntity } from './num-verify/PhoneNumInfo.entity';
import { PhoneNumberDbService } from './phone-number-db/phone-number-db.service';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'mySql12345',
      database: 'test',
      entities: [PhoneNumInfoEntity],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([PhoneNumInfoEntity]),
    HttpModule,
  ],
  controllers: [AppController],
  providers: [AppService, NumVerifyService, PhoneNumberDbService],
})
export class AppModule {}

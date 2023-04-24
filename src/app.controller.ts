import { NumVerifyService } from './num-verify/num-verify.service';
import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { PhoneNumInfo } from './num-verify/phoneNumInfo';
import { PhoneNumber } from './num-verify/PhoneNumber';
import { PhoneNumberDbService } from './phone-number-db/phone-number-db.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly numVerifyService: NumVerifyService,
    private phoneNumberDB: PhoneNumberDbService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('verify')
  async verifyPhoneByNumber(@Body() phoneNumber: PhoneNumber) {
    let data: PhoneNumInfo;

    await this.numVerifyService.verify(phoneNumber).then((res: any) => {
      data = res;
    });

    return JSON.stringify(data);
  }
}

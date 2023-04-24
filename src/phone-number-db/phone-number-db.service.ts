import { PhoneNumInfo } from './../num-verify/phoneNumInfo';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PhoneNumInfoEntity } from 'src/num-verify/PhoneNumInfo.entity';
import { PhoneNumber } from 'src/num-verify/PhoneNumber';
import { Repository } from 'typeorm';

@Injectable()
export class PhoneNumberDbService {
  constructor(
    @InjectRepository(PhoneNumInfoEntity)
    private readonly phoneNumRepository: Repository<PhoneNumInfoEntity>,
  ) {}

  async findPhoneNumInfoByID(phoneNumber: PhoneNumber): Promise<any> {
    const phoneNumber_id = `${phoneNumber.country_code}-${phoneNumber.phone_number}`;

    return this.phoneNumRepository.findOneBy({
      phoneNumber_id: phoneNumber_id,
    });
  }

  async saveLoginHistory(
    phoneNumber: PhoneNumber,
    phoneNumInfo: PhoneNumInfo,
  ): Promise<any> {
    // construct id from phone number
    const phoneNumber_id = `${phoneNumber.country_code}-${phoneNumber.phone_number}`;

    // set id
    phoneNumInfo.phoneNumber_id = phoneNumber_id;

    // save with ID
    return await this.phoneNumRepository.save(phoneNumInfo);
  }
}

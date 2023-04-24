import { PhoneNumberDbService } from './../phone-number-db/phone-number-db.service';
import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { AxiosRequestConfig } from 'axios';
import { Observable, catchError } from 'rxjs';
import { PhoneNumInfo } from './phoneNumInfo';
import { PhoneNumber } from './PhoneNumber';

const numVerifyURL = 'http://apilayer.net/api/validate';
const API_KEY = 'pNNZLl2g57nlpufCTrLArcwglgtbAdd6';

const TEST_KEY = 'testing';

const TEST_DATA02 = {
  valid: true,
  number: '85254647323',
  local_format: '54647323',
  international_format: '+85254647323',
  country_prefix: '+852',
  country_code: 'HK',
  country_name: 'Hong Kong, China',
  location: '',
  carrier: 'Hutchison Telephone Company Ltd (3 Hong Kong)',
  line_type: 'mobile',
};

@Injectable()
export class NumVerifyService {
  constructor(
    private readonly httpService: HttpService,
    private phoneNumberDbService: PhoneNumberDbService,
  ) {}

  async verify(phoneNumber: PhoneNumber): Promise<Observable<PhoneNumInfo>> {
    let phoneNumInfo: PhoneNumInfo;
    const country_code: number = phoneNumber.country_code;
    const phone_number: number = phoneNumber.phone_number;

    const myHeaders = new Headers();
    // myHeaders.append('apikey', TEST_KEY);
    myHeaders.append('apikey', API_KEY);

    console.log('country_code: ' + country_code);
    console.log('phone_number: ' + phone_number);

    return await new Promise<any>(async (resolve, reject) => {
      // search phone number in database to avoid repeatedly check against numverify
      // --> return phoneNumInfo on successful search
      await this.phoneNumberDbService
        .findPhoneNumInfoByID(phoneNumber)
        .then((res) => {
          if (res != null) {
            console.log('DB not null: ' + res);
            resolve(res);
            phoneNumInfo = res;
          }
        })
        .catch((err) => {
          reject(err);
          console.log('error: ' + err);
        });

      if (phoneNumInfo != null) {
        return true;
      }

      // --> continue check aginst numverify on failure
      console.log('DB not found...');
      console.log('check against numverify...');

      // REAL USAGE
      await fetch(
        `https://api.apilayer.com/number_verification/validate?number=${phone_number}&country_code=&format=${country_code}`,
        {
          method: 'GET',
          // body: '',
          headers: myHeaders,
        },
      )
        .then((res) => res.json())
        .then(async (result: any) => {
          console.log('response returned: ', result);

          const phoneNumInfo: PhoneNumInfo = {
            phoneNumber_id: '',
            country: result.country_name,
            location: result.location,
            carrier: result.carrier,
            line_type: result.line_type,
          };

          if (result.valid == false) {
            phoneNumInfo.carrier =
              phoneNumInfo.country =
              phoneNumInfo.line_type =
              phoneNumInfo.location =
                'invalid';
          }

          resolve(phoneNumInfo);

          await this.phoneNumberDbService
            .saveLoginHistory(phoneNumber, phoneNumInfo)
            .then((data) => {
              console.log(data);
            })
            .catch((err) => console.log(err));

          return true;
        })

        .catch((error) => {
          console.log('error', error);
          reject(error);
          return false;
        });
    });

    /* FOR TESTING
    // return await new Promise<any>(async (resolve, reject) => {
    const res = TEST_DATA02;

    phoneNumInfo = {
      phoneNumber_id: '',
      country: res.country_name,
      location: res.location,
      carrier: res.carrier,
      line_type: res.line_type,
    };

    resolve(phoneNumInfo);

    await this.phoneNumberDbService.saveLoginHistory(
      phoneNumber,
      phoneNumInfo,
    );
    */
  }
}

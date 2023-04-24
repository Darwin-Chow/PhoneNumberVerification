import { IsNotEmpty } from 'class-validator';

export class PhoneNumber {
  @IsNotEmpty()
  country_code: number;

  @IsNotEmpty()
  phone_number: number;
}

import { TypeOrmModule } from '@nestjs/typeorm';
import { Test, TestingModule } from '@nestjs/testing';
import { PhoneNumberDbService } from './phone-number-db.service';
import { PhoneNumInfoEntity } from 'src/num-verify/PhoneNumInfo.entity';

describe('PhoneNumberDbService', () => {
  let service: PhoneNumberDbService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PhoneNumberDbService],
    }).compile();

    service = module.get<PhoneNumberDbService>(PhoneNumberDbService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

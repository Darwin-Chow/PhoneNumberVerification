import { Column, Entity } from 'typeorm';

@Entity('PhoneNumInfo')
export class PhoneNumInfoEntity {
  @Column({
    primary: true,
    type: 'varchar',
    length: 30,
  })
  phoneNumber_id: string;
  // in format "{country Code}-{Number in full}"

  @Column('varchar', { length: 30 })
  country: string;

  @Column('varchar', { length: 50 })
  location: string;

  @Column('varchar', { length: 100 })
  carrier: string;

  @Column('varchar', { length: 30 })
  line_type: string;


}

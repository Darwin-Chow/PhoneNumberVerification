<<<<<<< HEAD
# PhoneNumberVerification
=======
<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>

</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

This API is for phone number verification in input phone number consist of country code and the number itself, 
`e.g., {"country_code": 1, "phone_number": 14158586273 }`

## pre-requisite installation
- [Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.
- [MySQL](https://www.mysql.com) database used in this API

For mySQL configuration,
In `/src/app.module.ts`
```typescript
    ...
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,             # change to your port number of mySQL database
      username: 'root',       # change to your username of mySQL database
      password: 'mySql12345', # change to your password of mySQL database
      database: 'test',       # change to your desired database of mySQL database
      entities: [PhoneNumInfoEntity],
      synchronize: true,
    }),
    ...
```


## Installation of dependencies

```bash
$ npm install
```

## Running the API

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

- default port is `3000` at `http://127.0.0.1`
- The url of api would be at `http://127.0.0.1:3000`

### Testing the API on `http://127.0.0.1:3000/verify`

```bash
# use curl to verify the phone number with two parameter 
# the input data could be in json format, e.g., {"country_code": 1, "phone_number": 14158586273 }

$ curl -X POST -H 
  'Content-Type: application/json' 
  -d '{"country_code": 1, "phone_number": 14158586273 }'
  'http://127.0.0.1:3000/verify'

# example response, return country, location, carrier and line type of the number along with number id in JSON format
$ {"phoneNumber_id":"1-14158586273","country":"United States of America","location":"Novato","carrier":"AT&T Mobility LLC","line_type":"mobile"}

```


## License

Nest is [MIT licensed](LICENSE).
>>>>>>> 963e061 (Test)

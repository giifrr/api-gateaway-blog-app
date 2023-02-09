import { Module } from '@nestjs/common';
import { UsersController } from './controllers/users/users.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { USER_SERVICE_NAME, protobufPackage } from './user.pb';
import { join } from 'path';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: USER_SERVICE_NAME,
        transport: Transport.GRPC,
        options: {
          package: protobufPackage,
          protoPath: join(__dirname, '../../../app-proto/user.proto')
        }
      }
    ])
  ],
  controllers: [UsersController]
})
export class UsersModule {}


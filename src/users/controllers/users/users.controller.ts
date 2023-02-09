import { Body, Controller, Inject, OnModuleInit, Post } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { CreateUserRequest, USER_SERVICE_NAME, User, UserServiceClient } from 'src/users/user.pb';

@Controller('users')
export class UsersController implements OnModuleInit {
  private svc: UserServiceClient

  @Inject(USER_SERVICE_NAME)
  private client: ClientGrpc

  onModuleInit() {
    this.svc = this.client.getService<UserServiceClient>(USER_SERVICE_NAME)
  }

  @Post()
  createUser(@Body() payload: CreateUserRequest) {
    return this.svc.createUser(payload);
  }
}

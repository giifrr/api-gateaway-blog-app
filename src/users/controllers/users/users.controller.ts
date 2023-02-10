import { Body, Controller, Get, Inject, OnModuleInit, Param, ParseIntPipe, Post } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { CreateUserRequest, FindOneResponse, USER_SERVICE_NAME, User, UserServiceClient } from 'src/users/user.pb';

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

  @Get('/:id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.svc.findOne({id});
  }
}

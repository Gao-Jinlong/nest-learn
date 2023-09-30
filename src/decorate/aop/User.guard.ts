import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';

@Injectable()
export class UserGuard implements CanActivate {
  @Inject(Reflector)
  private readonly reflector: Reflector;
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    console.log('user_gurad');

    const classMetadata = this.reflector.get('roles', context.getClass());
    const handlerMetadata = this.reflector.get('roles', context.getHandler());

    console.log('metadata:', classMetadata, handlerMetadata);

    return true;
  }
}

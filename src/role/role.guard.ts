import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const requireRoles = this.reflector.get('roles', context.getHandler());

    if (!requireRoles) {
      return true;
    }

    // 获取 http 上下文中的 request 对象
    const request = context.switchToHttp().getRequest();
    // 获取 url 参数
    const { user } = request.query;

    return requireRoles.some((role) => user && user.includes(role));
  }
}

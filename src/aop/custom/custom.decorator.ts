import {
  Controller,
  ExecutionContext,
  Get,
  SetMetadata,
  UseGuards,
  applyDecorators,
  createParamDecorator,
} from '@nestjs/common';
import { Role } from 'src/aop/role/role.enum';
import { RoleGuard } from 'src/aop/role/role.guard';

// 自定义方法装饰器
export function Custom(path: string, roles: Role[]) {
  return applyDecorators(
    Get(path),
    SetMetadata('roles', roles),
    UseGuards(RoleGuard),
  );
}

// 自定义参数装饰器
export const MyHeaders = createParamDecorator(
  (key: string, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return key ? request.headers[key.toLowerCase()] : request.headers;
  },
);

// 自定义类装饰器
export function CustomClass(path: string) {
  return Controller(path);
}

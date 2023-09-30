import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Optional,
  Inject,
  UseFilters,
  HttpException,
  HttpStatus,
  SetMetadata,
  UseGuards,
  Query,
  Headers,
  Ip,
  Session,
  HostParam,
  Req,
  Res,
  Next,
  HttpCode,
  Header,
  Redirect,
  Render,
  ParseIntPipe,
} from '@nestjs/common';
import { DecorateService } from './decorate.service';
import { CreateDecorateDto } from './dto/create-decorate.dto';
import { UpdateDecorateDto } from './dto/update-decorate.dto';
import { CustomErrorFilter } from './aop/CustomError.filter';
import { UserGuard } from './aop/User.guard';
import { NextFunction, Request, Response } from 'express';
import { FailFilter } from 'src/fail/fail.filter';
import { FailException } from 'src/fail/FailException';
import { RoleGuard } from 'src/role/role.guard';
import { Role } from 'src/role/role.enum';
import { Custom, CustomClass, MyHeaders } from 'src/custom/custom.decorator';

@CustomClass('decorate') // 自定义类装饰器
@Controller({
  host: ':host.0.0.1', // 设置后只有当请求主机匹配指定值时，才会路由 Controller 中的方法
})
@UseGuards(UserGuard) // 使用 guard
@SetMetadata('roles', ['user']) // 可以设置 metadata
export class DecorateController {
  constructor(
    @Optional() // 通过 Optional decorate 可以声明为可选注入，即使 IoC 容器没有提供对应依赖也不会报错
    @Inject('notExistService')
    private readonly optionalService: unknown,
    private readonly decorateService: DecorateService,
  ) {}

  @Post()
  create(@Body() createDecorateDto: CreateDecorateDto) {
    return {
      msg: this.decorateService.create(createDecorateDto),
      content: createDecorateDto,
    };
  }

  @Get()
  @UseFilters(CustomErrorFilter) // 错误过滤 filter
  findAll(
    @Query('error') error: boolean,
    @Query() query: string,
    @Ip() ip: string,
    @Session() session: Record<string, any>,
    @Headers() headers: Record<string, any>,
    @HostParam('host') host,
  ) {
    if (error) {
      throw new HttpException('error filter', HttpStatus.BAD_REQUEST);
    }

    if (!session.count) {
      session.count = 0;
    }
    session.count++;

    return {
      content: this.decorateService.findAll(),
      ip,
      session,
      host,
      msg: {
        query,
        headers,
      },
    };
  }

  @Get('test')
  useSamePath(
    // 注入 Next 可以将请求传递给下一个中间件，这里会发送到下一个相同路径的路由。
    // 注入 Next 后，Nest 不会处理 Controller 的返回值
    @Next() next: NextFunction,
  ) {
    console.log('useSamePath');
    next();
    return {
      msg: 'useSamePath',
    };
  }

  @Get('test')
  @HttpCode(210) // 修改返回状态码
  @Header('Cache-Control', 'none') // 设置响应头
  test(
    @Req() req: Request,
    @Res({
      passthrough: false, // 设置为 true 后，可以在 Controller 中注入 Response 对象，但是仍会自动响应
    })
    res: Response,
  ) {
    console.log(req);
    res.header('Custom-Header', 'test'); // 注入 Response 对象后，可以手动设置响应头

    res.send('res'); // 注入 Response 对象后，需要手动响应，不会在使用 Controller 的返回值作为响应
    return {
      msg: 'test',
    };
  }

  @Get('juejin')
  @Redirect('https://juejin.cn', 301) // 重定向
  redirect() {}

  @Get('user')
  @Render('user') // 指定视图模板
  @UseFilters(FailFilter)
  user() {
    throw new FailException('error msg', 'error cause');
    return { name: 'Ginlon', age: 18 }; // 指定视图模板后，可以直接返回数据，不需要手动渲染
  }

  @Get(':id')
  @UseGuards(UserGuard, RoleGuard) // 使用 guard
  @SetMetadata('roles', [Role.Admin])
  findOne(@Param('id', ParseIntPipe) id: number, @Param('user') user: Role) {
    console.log('get:id', typeof id);
    return { user, msg: this.decorateService.findOne(id) };
  }

  // 自定义装饰器
  @Custom('group/:id', [Role.Admin, Role.User])
  findGroup(
    @Param('id', ParseIntPipe) id: number,
    @MyHeaders() headers: Record<string, any>,
    @Query('user') role: Role,
  ) {
    return {
      msg: 'findGroup',
      id,
      role,
      headers,
    };
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateDecorateDto: UpdateDecorateDto,
  ) {
    return this.decorateService.update(+id, updateDecorateDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.decorateService.remove(+id);
  }
}

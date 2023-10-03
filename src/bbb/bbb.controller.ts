import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  OnModuleInit,
  OnApplicationBootstrap,
  OnModuleDestroy,
  BeforeApplicationShutdown,
  OnApplicationShutdown,
  Next,
  Res,
  UseInterceptors,
  Query,
  ParseIntPipe,
  HttpStatus,
  HttpException,
  ParseFloatPipe,
  ParseBoolPipe,
  ParseArrayPipe,
  ParseEnumPipe,
  ParseUUIDPipe,
  DefaultValuePipe,
  ValidationPipe,
  UploadedFile,
  UploadedFiles,
  ParseFilePipe,
  MaxFileSizeValidator,
  FileTypeValidator,
} from '@nestjs/common';
import { BbbService } from './bbb.service';
import { CreateBbbDto } from './dto/create-bbb.dto';
import { UpdateBbbDto } from './dto/update-bbb.dto';
import { TimeInterceptor } from 'src/aop/time/time.interceptor';
import { MyValidationPipe } from 'src/aop/myValidation/myValidation.pipe';
import {
  AnyFilesInterceptor,
  FileFieldsInterceptor,
  FileInterceptor,
  FilesInterceptor,
} from '@nestjs/platform-express';
import { storage } from './fileStorage';
import { FileSizeValidationPipe } from 'src/aop/fileSizeValidation/fileSizeValidation.pipe';
import { MyFileValidator } from './myFileValidator';

@Controller('bbb')
export class BbbController
  implements
    OnModuleInit,
    OnApplicationBootstrap,
    OnModuleDestroy,
    BeforeApplicationShutdown,
    OnApplicationShutdown
{
  constructor(private readonly bbbService: BbbService) {}

  @Post()
  create(@Body(MyValidationPipe) createBbbDto: CreateBbbDto) {
    return {
      msg: this.bbbService.create(createBbbDto),
      body: createBbbDto,
    };
  }

  @Get()
  @UseInterceptors(TimeInterceptor)
  async findAll() {
    // throw new Error('findAll error');
    // await new Promise((resolve) => {
    //   setTimeout(() => {
    //     resolve('timeout');
    //   }, 2000);
    // });
    return this.bbbService.findAll();
  }

  @Get('user/:id')
  findOne(@Param('id') id: string, @Next() next, @Res() res) {
    const idNum = +id;
    if (Number.isNaN(idNum)) {
      next();
    } else {
      res.send(this.bbbService.findOne(idNum));
    }
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBbbDto: UpdateBbbDto) {
    return this.bbbService.update(+id, updateBbbDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bbbService.remove(+id);
  }

  @Get('hello1')
  hello() {
    return 'hello1';
  }
  @Get('hello2')
  hello2() {
    return 'hello2';
  }
  @Get('hi')
  hi() {
    return 'hi';
  }

  @Get('query')
  query(
    @Query(
      'id',
      new ParseIntPipe({
        // errorHttpStatusCode: HttpStatus.NOT_FOUND,  // 修改错误返回状态码
        exceptionFactory: (msg) => {
          console.log(msg);
          throw new HttpException('xxx' + msg, HttpStatus.NOT_FOUND);
        },
      }),
    )
    id: number,
    @Query('float', ParseFloatPipe)
    float: number,
    @Query('bool', ParseBoolPipe)
    bool: boolean,
    @Query(
      'array',
      new ParseArrayPipe({
        // 需要依赖 class-transformer, class-validator
        items: Number, // 指定数组元素类型
        separator: ',', // 指定分隔符
        optional: true, // 是否可选
      }),
    )
    array: number[],
    @Query('enumParse', new ParseEnumPipe(HttpStatus)) // 枚举类型转换，如果入参不在枚举范围内则会报错
    enumParse: HttpStatus,
    @Query('uuid', new ParseUUIDPipe()) // uuid 通过 nodejs 的 uuid 包生成 require('uuid').v4()
    uuid: string,
    @Query('defaultValue', new DefaultValuePipe('default'))
    defaultValue: string,
  ) {
    // http://127.0.0.1:3000/bbb/query?id=123&float=1.23&bool=false&array=1,2,3&enumParse=NOT_FOUND&uuid=41859bbe-3642-4f86-959a-03b8c70da8be
    return {
      query: {
        id: {
          type: typeof id,
          value: id,
        },
        float: {
          type: typeof float,
          value: float,
        },
        bool: {
          type: typeof bool,
          value: bool,
        },
        array: {
          type: typeof array,
          value: array,
        },
        enumParse: {
          type: typeof enumParse,
          value: enumParse,
        },
        uuid: {
          type: typeof uuid,
          value: uuid,
        },
        defaultValue: {
          type: typeof defaultValue,
          value: defaultValue,
        },
      },
    };
  }

  @Post('upload')
  @UseInterceptors(
    FileInterceptor('file', {
      dest: 'uploads',
    }),
  )
  uploadFile(
    @UploadedFile(
      // FileSizeValidationPipe, // 自定义的文件验证管道
      // 内置的 ParseFilePipe 会对文件进行验证
      new ParseFilePipe({
        validators: [
          // 限制文件大小
          // new MaxFileSizeValidator({
          //   maxSize: 10 * 2 ** 20,
          // }),
          new MyFileValidator({}),
          // 限制文件类型
          new FileTypeValidator({
            fileType: 'image/jpeg',
          }),
        ],
      }),
    )
    file: Express.Multer.File,
    @Body() body,
  ) {
    console.log('upload body', body);
    console.log('file', file);
  }
  @Post('uploadFiles')
  @UseInterceptors(
    // formData 字段名，文件数，option
    FilesInterceptor('files', 2, {
      dest: 'uploads',
    }),
  )
  uploadFiles(
    @UploadedFiles()
    files: Express.Multer.File[],
    @Body() body,
  ) {
    console.log('upload body', body);
    console.log('files', files);
  }

  // 上传多字段文件
  @Post('uploadMultipleFields')
  @UseInterceptors(
    FileFieldsInterceptor([
      {
        name: 'avatar',
        maxCount: 1,
      },
      {
        name: 'background',
        maxCount: 1,
      },
    ]),
  )
  uploadMultipleFields(
    @UploadedFiles()
    files: {
      avatar: Express.Multer.File[];
      background: Express.Multer.File[];
    },
    @Body() body,
  ) {
    console.log('body', body);
    console.log('files', files);
  }
  @Post('uploadAnyField')
  @UseInterceptors(
    AnyFilesInterceptor({
      // dest: 'uploads',
      storage: storage,
    }),
  )
  uploadAnyFiles(@UploadedFiles() files: Express.Multer.File[], @Body() body) {
    console.log('body', body);
    console.log('files', files);
  }
  onApplicationBootstrap() {
    console.log('Bbb Controller onApplicationBootstrap');
  }
  onModuleInit() {
    console.log('Bbb Controller onModuleInit');
  }
  onModuleDestroy() {
    console.log('Bbb Controller onModuleDestroy');
  }
  beforeApplicationShutdown() {
    console.log('Bbb Controller beforeApplicationShutdown');
  }
  onApplicationShutdown(signal?: string) {
    console.log('Bbb Controller onApplicationShutdown, signal: ', signal);
  }
}

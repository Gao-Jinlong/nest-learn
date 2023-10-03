import {
  ArgumentMetadata,
  BadRequestException,
  Inject,
  Injectable,
  Optional,
  PipeTransform,
} from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';

// validationPipe 实现方式

@Injectable()
export class MyValidationPipe implements PipeTransform {
  @Optional()
  @Inject('validation_options') // pipe 也可以注入依赖，需要 依赖注入时不能使用 new 创建 pipe
  private validationOptions;
  async transform(value: any, { metatype }: ArgumentMetadata) {
    if (!metatype) {
      return value;
    }

    console.log('validationOptions: ', this.validationOptions);

    const object = plainToInstance(metatype, value); // 将普通对象转换为类实例
    const errors = await validate(object); // 验证类实例

    if (errors.length > 0) {
      throw new BadRequestException('Validation failed');
    }
    return value;
  }
}

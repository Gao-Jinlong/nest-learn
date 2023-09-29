import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';

// Pipe 可以对某个参数生效，也可以对某个路由生效，也可以对每个路由生效
@Injectable()
export class ValidationPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    console.log(
      'ValidationPipe transform..., value: ',
      value,
      ', metadata: ',
      metadata,
    );
    return value;
  }
}

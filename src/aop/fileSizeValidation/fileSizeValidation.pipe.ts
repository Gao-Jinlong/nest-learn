import {
  ArgumentMetadata,
  HttpException,
  HttpStatus,
  Injectable,
  PipeTransform,
} from '@nestjs/common';

@Injectable()
export class FileSizeValidationPipe implements PipeTransform {
  transform(value: Express.Multer.File, metadata: ArgumentMetadata) {
    if (value.size > 10 * 2 ** 20) {
      throw new HttpException('文件大小不能超过10MB', HttpStatus.BAD_REQUEST);
    }
    return value;
  }
}

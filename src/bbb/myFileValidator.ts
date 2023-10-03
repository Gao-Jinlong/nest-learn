import { FileValidator } from '@nestjs/common';

// 自定义文件验证器
export class MyFileValidator extends FileValidator {
  private readonly MAX_SIZE: number = 10 * 2 ** 20; // 10MB
  constructor(options: any) {
    super(options);
  }

  isValid(file: Express.Multer.File): boolean | Promise<boolean> {
    if (file.size > this.MAX_SIZE) {
      return false;
    }
    return true;
  }

  buildErrorMessage(file: Express.Multer.File): string {
    return `文件${file.originalname}大小超出${this.MAX_SIZE / 2 ** 20}MB`;
  }
}

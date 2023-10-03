import {
  Contains,
  IsEmail,
  IsFQDN,
  IsInt,
  Length,
  Max,
  Min,
} from 'class-validator';

// 装饰器文档 https://www.npmjs.com/package/class-validator
export class CreateBbbDto {
  name: string;
  @IsInt()
  @Max(200)
  @Min(0)
  age: number;
  @IsEmail()
  mail: string;
  @IsFQDN() // 检验是否是合法的域名
  site: string;
  isAdult: boolean;
  hobbies: string[];
  @Contains('title:') // 检验是否包含指定字符串
  @Length(0, 200, {
    // 自定义错误消息
    message(validationArguments) {
      console.log('validationArguments: ', validationArguments);
      return '备注长度不能超过200';
    },
  })
  remark: string;
}

import { Controller, Get, Inject } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  // @Inject(AppService) // 如果不想在构造函数中注入，可以直接注入到属性中
  // private readonly appService: AppService;
  constructor(
    // 使用 class 作为 token 注入可以不需要 @Inject
    private readonly appService: AppService,
    // 使用字符串作为 token 注入需要通过 @Inject
    @Inject('person') private readonly person: { name: string; age: number },
    @Inject('github')
    private readonly github: {
      name: string;
      mail: string;
      appService: AppService;
      person: {
        name: string;
        age: number;
      };
    },
    @Inject('GitHub')
    private readonly GitHub: {
      name: string;
      mail: string;
      appService: AppService;
      person: {
        name: string;
        age: number;
      };
    },
  ) {}

  @Get()
  getHello(): string {
    return `${this.appService.getHello()} 
     I am ${this.person.name}
      I am ${this.person.age} years old
      My github is ${this.GitHub.name}
     `;
  }
}

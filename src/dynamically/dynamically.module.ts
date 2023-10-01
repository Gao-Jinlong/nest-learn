import { Module, DynamicModule } from '@nestjs/common';
import { DynamicallyService } from './dynamically.service';
import { DynamicallyController } from './dynamically.controller';
import { ConfigurableModule } from 'src/configurable/configurable.module';

@Module({})
export class DynamicallyModule {
  // 约定命名
  // register 用一次模块传递一次配置
  // forRoot 配置一次模块使用多次，一般在 app.module 中导入，通常用于全局配置
  // forFeature 针对不同模块配置不同的参数，通常用于模块配置相关
  static register(options: Record<string, any>): DynamicModule {
    const provide = {
      provide: 'DYNAMIC_OPTIONS_CONFIG',
      useValue: options,
    };
    // 返回动态模块，可在其他模块中导入
    return {
      module: DynamicallyModule,
      imports: [
        // 导入工厂创建的动态模块
        ConfigurableModule.register({
          name: 'Ginlon',
          age: 19,
          isGlobal: false, // 通过 setExtras 扩展属性
        }),
        // 导入异步创建的动态模块
        ConfigurableModule.registerAsync({
          useFactory: async () => {
            return {
              name: 'Ginlon_async',
              age: 20,
            };
          },
        }),
      ],
      controllers: [DynamicallyController],
      providers: [DynamicallyService, provide],
      exports: [provide],
    };
  }
}

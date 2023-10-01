import { Module } from '@nestjs/common';
import { ConfigurableModuleClass } from './configurable.module-definition';
import { ConfigurableController } from './configurable.controller';

@Module({
  controllers: [ConfigurableController],
})
// 继承工厂类，实现动态模块（工厂类中携带创建类的静态方法 register 等）
export class ConfigurableModule extends ConfigurableModuleClass {}

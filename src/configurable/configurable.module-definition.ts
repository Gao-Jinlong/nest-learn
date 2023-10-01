import { ConfigurableModuleBuilder } from '@nestjs/common';

export interface ConfigurableOptions {
  name: string;
  age: number;
}

// 动态模块工厂
export const {
  ConfigurableModuleClass,
  MODULE_OPTIONS_TOKEN,
  OPTIONS_TYPE, // 方法返回的类型定义
  ASYNC_OPTIONS_TYPE,
} = new ConfigurableModuleBuilder<ConfigurableOptions>()
  .setClassMethodName('register') // 设置创建动态类的静态方法名
  .setExtras(
    // setExtras 第一个参数 extras 扩展到 options 中，第二个参数是收到 extras 属性后如何修改模块定义
    {
      isGlobal: false, // 是否全局模块
    },
    (definition, extras) => ({
      ...definition,
      global: extras.isGlobal,
    }),
  )
  .build();

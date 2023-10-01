import { Controller, Get, Inject } from '@nestjs/common';
import {
  OPTIONS_TYPE,
  MODULE_OPTIONS_TOKEN,
} from './configurable.module-definition';

@Controller('configurable')
export class ConfigurableController {
  @Inject(MODULE_OPTIONS_TOKEN)
  private options: typeof OPTIONS_TYPE;

  @Get()
  hello() {
    console.log(this.options.isGlobal);
    return this.options;
  }
}

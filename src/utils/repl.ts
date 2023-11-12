import { AppModule } from '@/modules/app';
import { Logger } from '@nestjs/common';
import { repl } from '@nestjs/core';
import { existsSync, mkdirSync } from 'fs';
import { join } from 'path';

(async () => {
  const replServer = await repl(AppModule);
  const logger = new Logger();

  const cacheDir = join('node_modules', '.cache');
  if (!existsSync(cacheDir)) mkdirSync(cacheDir);

  replServer.setupHistory(join(cacheDir, '.nestjs_repl_history'), (err) => {
    if (err) logger.error(err);
  });
})();

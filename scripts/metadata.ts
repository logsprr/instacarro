import path from 'path';

import { PluginMetadataGenerator } from '@nestjs/cli/lib/compiler/plugins';
import { ReadonlyVisitor } from '@nestjs/swagger/dist/plugin';

const generator = new PluginMetadataGenerator();

const pathToSource = path.join(__dirname, '../src');

generator.generate({
  visitors: [
    new ReadonlyVisitor({
      introspectComments: true,
      classValidatorShim: false,
      pathToSource,
      debug: true,
    }),
  ],
  outputDir: pathToSource,
  tsconfigPath: 'tsconfig.build.json',
});

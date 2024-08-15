import { INestApplication } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

import { name, description, title, version } from '../../package.json';
import metadata from '@app/metadata';

export const setupSwagger = async (app: INestApplication) => {
  const config = new DocumentBuilder()
    .setTitle(title)
    .setDescription(description)
    .setVersion(version)
    .addTag(name)
    .build();

  await SwaggerModule.loadPluginMetadata(metadata);
  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api/docs', app, document);
};

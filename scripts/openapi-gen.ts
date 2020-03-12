import 'reflect-metadata';

import { writeFileSync } from 'fs';
import { join } from 'path';
// this will also load the app metadata
import { container, routingControllersOptions } from '@src/app';

import { defaultMetadataStorage } from 'class-transformer/storage';
import { getFromContainer, MetadataStorage } from 'class-validator';
import { getMetadataArgsStorage } from 'routing-controllers';
import { routingControllersToSpec } from 'routing-controllers-openapi';
import { validationMetadatasToSchemas } from 'class-validator-jsonschema';
import { AppLogger } from '@src/util/logger';

const logger = container.get<AppLogger>(AppLogger);

logger.info(`loading app metadata, using environment ${process.env.NODE_ENV}`);

const metadatas = (getFromContainer(MetadataStorage) as any).validationMetadatas;
const schemas = validationMetadatasToSchemas(metadatas, {
  classTransformerMetadataStorage: defaultMetadataStorage,
  refPointerPrefix: '#/components/schemas/',
});

const storage = getMetadataArgsStorage();

logger.info('generating openapi spec from metadata and options');

const spec = routingControllersToSpec(storage, routingControllersOptions, {
  components: {
    schemas,
  },
});

// save spec file
const rootFilePath = join(__dirname, '../openapi.spec.json');
logger.info(`saving openapi spec file to ${rootFilePath}`);
writeFileSync(rootFilePath, JSON.stringify(spec, null, 2));

logger.info('openapi generation complete');

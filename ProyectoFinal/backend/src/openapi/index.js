import yaml from 'js-yaml';
import {readFileSync} from 'fs';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const _dirname = dirname(fileURLToPath(import.meta.url));
console.log(_dirname);

export const swaggerDoc = yaml.load(readFileSync(_dirname+'/openapi.yml', 'utf-8'));
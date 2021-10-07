/**
 * This file use for TypeORM migration, typeorm:cli need command need to import the exact config file.
 * Therefore, we created a single file to export the information in app.config file.
 */

import { AppConfig } from '@/app.config';

export default AppConfig.getTypeOrmConfig();

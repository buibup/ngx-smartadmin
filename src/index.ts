import { SmartAdminModule } from './smartadmin.module';

let version = process.env.LIB_VERSION || 'dev';

export {
  SmartAdminModule,
  version
};

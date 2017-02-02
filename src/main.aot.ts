import { platformBrowser } from '@angular/platform-browser';
import { AppModuleNgFactory } from './app/app.module.ngfactory';
import 'zone.js/dist/zone';

platformBrowser().bootstrapModuleFactory(AppModuleNgFactory);

import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { provideEnvironmentNgxMask, NgxMaskConfig } from 'ngx-mask';

const maskConfig: Partial<NgxMaskConfig> = {
  validation: false, // exemplo: desativa validação
};

bootstrapApplication(AppComponent, {
  ...appConfig,
  providers: [
    ...appConfig.providers ?? [],
    provideEnvironmentNgxMask(maskConfig),
  ],
}).catch((err) => console.error(err));

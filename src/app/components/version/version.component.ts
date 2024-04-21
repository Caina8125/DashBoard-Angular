import { Component } from '@angular/core';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-version',
  template: `<p>{{ currentApplicationVersion }}</p>`,
  styleUrls:['./version.component.css']
})
export class VersionComponent {
  currentApplicationVersion = environment.appVersion;
}

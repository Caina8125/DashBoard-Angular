import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DarkModeService {
  private darkModeSubject = new BehaviorSubject<boolean>(false);

  getDarkModeState(): Observable<boolean> {
    return this.darkModeSubject.asObservable();
  }

  toggleDarkMode() {
    this.darkModeSubject.next(!this.darkModeSubject.value);
  }
}

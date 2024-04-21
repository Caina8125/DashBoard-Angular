import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TelaUploadComponent } from './tela-upload.component';

describe('TelaUploadComponent', () => {
  let component: TelaUploadComponent;
  let fixture: ComponentFixture<TelaUploadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TelaUploadComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TelaUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

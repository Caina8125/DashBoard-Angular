import { TestBed } from '@angular/core/testing';

import { ModalUploadService } from './modal-upload.service';

describe('ModalUploadService', () => {
  let service: ModalUploadService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ModalUploadService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { RegistroMedicoService } from './registro-medico.service';

describe('RegistroMedicoService', () => {
  let service: RegistroMedicoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RegistroMedicoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { CrearConsultaService } from './crear-consulta.service';

describe('CrearConsultaService', () => {
  let service: CrearConsultaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CrearConsultaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

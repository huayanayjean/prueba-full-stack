import { TestBed } from '@angular/core/testing';

import { CursoEstudiantesService } from './curso-estudiantes.service';

describe('CursoEstudiantesService', () => {
  let service: CursoEstudiantesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CursoEstudiantesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

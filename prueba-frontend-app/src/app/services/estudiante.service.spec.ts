import { TestBed } from '@angular/core/testing';
import { EstudianteService } from './estudiante.service';



describe('EstudianteServiceService', () => {
  let service: EstudianteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EstudianteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

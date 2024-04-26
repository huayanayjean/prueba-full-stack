import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsignarCursoEstudianteComponent } from './asignar-curso-estudiante.component';

describe('AsignarCursoEstudianteComponent', () => {
  let component: AsignarCursoEstudianteComponent;
  let fixture: ComponentFixture<AsignarCursoEstudianteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AsignarCursoEstudianteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AsignarCursoEstudianteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

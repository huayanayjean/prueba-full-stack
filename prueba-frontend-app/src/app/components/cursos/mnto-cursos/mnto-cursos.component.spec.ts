import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MntoCursosComponent } from './mnto-cursos.component';

describe('NuevoEstudianteComponent', () => {
  let component: MntoCursosComponent;
  let fixture: ComponentFixture<MntoCursosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MntoCursosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MntoCursosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

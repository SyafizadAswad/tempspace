import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MachineRegisterPage } from './machine-register-page';

describe('MachineRegisterPage', () => {
  let component: MachineRegisterPage;
  let fixture: ComponentFixture<MachineRegisterPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MachineRegisterPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MachineRegisterPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

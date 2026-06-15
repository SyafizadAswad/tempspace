import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MachineEdit } from './machine-edit';

describe('MachineEdit', () => {
  let component: MachineEdit;
  let fixture: ComponentFixture<MachineEdit>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MachineEdit]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MachineEdit);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MachineDataPage } from './machine-data-page';

describe('MachineDataPage', () => {
  let component: MachineDataPage;
  let fixture: ComponentFixture<MachineDataPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MachineDataPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MachineDataPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataGaugeBar } from './data-gauge-bar';

describe('DataGaugeBar', () => {
  let component: DataGaugeBar;
  let fixture: ComponentFixture<DataGaugeBar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DataGaugeBar]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DataGaugeBar);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

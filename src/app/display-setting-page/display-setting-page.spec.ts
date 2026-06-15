import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplaySettingPage } from './display-setting-page';

describe('DisplaySettingPage', () => {
  let component: DisplaySettingPage;
  let fixture: ComponentFixture<DisplaySettingPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DisplaySettingPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DisplaySettingPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

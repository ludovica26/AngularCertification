import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigModelColorComponent } from './config-model-color.component';

describe('ConfigModelColorComponent', () => {
  let component: ConfigModelColorComponent;
  let fixture: ComponentFixture<ConfigModelColorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfigModelColorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ConfigModelColorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

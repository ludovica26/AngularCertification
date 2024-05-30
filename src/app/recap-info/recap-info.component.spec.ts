import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecapInfoComponent } from './recap-info.component';

describe('RecapInfoComponent', () => {
  let component: RecapInfoComponent;
  let fixture: ComponentFixture<RecapInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecapInfoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RecapInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

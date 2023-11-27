import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateApartmentComponent } from './create-apartment.component';

describe('CreateApartmentComponent', () => {
  let component: CreateApartmentComponent;
  let fixture: ComponentFixture<CreateApartmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateApartmentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateApartmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

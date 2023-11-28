import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateAccountComponent } from './update-account.component';

describe('UpdateAccountComponent', () => {
  let component: UpdateAccountComponent;
  let fixture: ComponentFixture<UpdateAccountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UpdateAccountComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UpdateAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HostAccountComponent } from './host-account.component';

describe('HostAccountComponent', () => {
  let component: HostAccountComponent;
  let fixture: ComponentFixture<HostAccountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HostAccountComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(HostAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

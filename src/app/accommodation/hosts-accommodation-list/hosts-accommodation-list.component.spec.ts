import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HostsAccommodationListComponent } from './hosts-accommodation-list.component';

describe('HostsAccommodationListComponent', () => {
  let component: HostsAccommodationListComponent;
  let fixture: ComponentFixture<HostsAccommodationListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HostsAccommodationListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HostsAccommodationListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

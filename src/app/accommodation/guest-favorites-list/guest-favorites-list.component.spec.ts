import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuestFavoritesListComponent } from './guest-favorites-list.component';

describe('GuestFavoritesListComponent', () => {
  let component: GuestFavoritesListComponent;
  let fixture: ComponentFixture<GuestFavoritesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GuestFavoritesListComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(GuestFavoritesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

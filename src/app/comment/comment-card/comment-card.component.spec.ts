import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommentCardComponent } from './comment-card.component';

describe('CommentComponent', () => {
  let component: CommentCardComponent;
  let fixture: ComponentFixture<CommentCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CommentCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CommentCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

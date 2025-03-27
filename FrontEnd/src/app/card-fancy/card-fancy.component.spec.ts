import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardFancyComponent } from './card-fancy.component';

describe('CardFancyComponent', () => {
  let component: CardFancyComponent;
  let fixture: ComponentFixture<CardFancyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardFancyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardFancyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

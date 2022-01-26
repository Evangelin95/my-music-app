import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardListmusicComponent } from './card-listmusic.component';

describe('CardListmusicComponent', () => {
  let component: CardListmusicComponent;
  let fixture: ComponentFixture<CardListmusicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardListmusicComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardListmusicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

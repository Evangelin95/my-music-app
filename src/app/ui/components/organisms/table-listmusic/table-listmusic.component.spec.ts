import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableListmusicComponent } from './table-listmusic.component';

describe('TableListmusicComponent', () => {
  let component: TableListmusicComponent;
  let fixture: ComponentFixture<TableListmusicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableListmusicComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TableListmusicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

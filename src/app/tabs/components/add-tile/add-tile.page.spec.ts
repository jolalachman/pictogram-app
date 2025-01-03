import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddTilePage } from './add-tile.page';

describe('AddTilePage', () => {
  let component: AddTilePage;
  let fixture: ComponentFixture<AddTilePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTilePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

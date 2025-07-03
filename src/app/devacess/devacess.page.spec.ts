import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DevacessPage } from './devacess.page';

describe('DevacessPage', () => {
  let component: DevacessPage;
  let fixture: ComponentFixture<DevacessPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(DevacessPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

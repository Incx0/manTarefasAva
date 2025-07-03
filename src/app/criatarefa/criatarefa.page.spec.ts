import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CriatarefaPage } from './criatarefa.page';

describe('CriatarefaPage', () => {
  let component: CriatarefaPage;
  let fixture: ComponentFixture<CriatarefaPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CriatarefaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

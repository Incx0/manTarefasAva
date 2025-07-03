import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProgressoTarefaPage } from './progresso-tarefa.page';

describe('ProgressoTarefaPage', () => {
  let component: ProgressoTarefaPage;
  let fixture: ComponentFixture<ProgressoTarefaPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgressoTarefaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

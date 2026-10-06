import { TestBed } from '@angular/core/testing';
import { ColecaoService } from './colecao.service';

describe('ColecaoService', () => {
  let service: ColecaoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ColecaoService);
  });

  it('deve anotar motivo e somar vezes no item', () => {
    service.anotar(25, 'Voltei para completar', 3);
    service.anotar(25, 'Não consegui parar', 2);

    expect(service.notasDoItem(25)).toHaveLength(2);
    expect(service.notasDoItem(25).reduce((total, nota) => total + nota.vezes, 0)).toBe(5);
  });
});

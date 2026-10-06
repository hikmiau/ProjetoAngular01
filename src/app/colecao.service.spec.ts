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

  it('deve expor a frase conforme o nível atual', () => {
    expect(service.frase()).toBe('Só dar uma olhada.');

    for (let id = 1; id <= 3; id++) service.coletar(id);
    expect(service.frase()).toBe('Só mais um.');

    for (let id = 4; id <= 8; id++) service.coletar(id);
    expect(service.frase()).toBe('Você já devia ter parado.');

    for (let id = 9; id <= 15; id++) service.coletar(id);
    expect(service.frase()).toBe('Você não consegue soltar.');
  });
});

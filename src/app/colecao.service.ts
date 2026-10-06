import { Injectable, computed, signal } from '@angular/core';

export interface Nota {
  motivo: string;
  vezes: number;
  criadaEm: number;
}

type Nivel = 'curiosidade' | 'hábito' | 'fixação' | 'possessão';

@Injectable({ providedIn: 'root' })
export class ColecaoService {
  readonly ids = signal<number[]>([]);
  readonly notas = signal<Record<number, Nota[]>>({});

  readonly total = computed(() => this.ids().length);
  // a meta sempre passa à frente: a coleção nunca fecha
  readonly meta = computed(() => (Math.floor(this.total() / 5) + 1) * 5);
  // cresce sem nunca chegar a 1
  readonly intensidade = computed(() => 1 - 1 / (1 + this.total() / 10));
  readonly nivel = computed<Nivel>(() => {
    const t = this.total();
    if (t < 3) return 'curiosidade';
    if (t < 8) return 'hábito';
    if (t < 15) return 'fixação';
    return 'possessão';
  });
  readonly frase = computed(() => {
    switch (this.nivel()) {
      case 'curiosidade':
        return 'Só dar uma olhada.';
      case 'hábito':
        return 'Só mais um.';
      case 'fixação':
        return 'Você já devia ter parado.';
      case 'possessão':
        return 'Você não consegue soltar.';
    }
  });

  tem(id: number) { return this.ids().includes(id); }
  coletar(id: number) { if (!this.tem(id)) this.ids.update(l => [...l, id]); }
  soltar(id: number) { this.ids.update(l => l.filter(x => x !== id)); }
  notasDoItem(id: number) { return this.notas()[id] ?? []; }
  anotar(id: number, motivo: string, vezes: number) {
    const novaNota: Nota = { motivo, vezes, criadaEm: Date.now() };
    this.notas.update(notasAtuais => ({
      ...notasAtuais,
      [id]: [...(notasAtuais[id] ?? []), novaNota],
    }));
  }
}

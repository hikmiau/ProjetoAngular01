import { Injectable, computed, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ColecaoService {
  readonly ids = signal<number[]>([]);

  readonly total = computed(() => this.ids().length);
  // a meta sempre passa à frente: a coleção nunca fecha
  readonly meta = computed(() => (Math.floor(this.total() / 5) + 1) * 5);
  // cresce sem nunca chegar a 1
  readonly intensidade = computed(() => 1 - 1 / (1 + this.total() / 10));
  readonly nivel = computed(() => {
    const t = this.total();
    if (t < 3) return 'curiosidade';
    if (t < 8) return 'hábito';
    if (t < 15) return 'fixação';
    return 'possessão';
  });

  tem(id: number) { return this.ids().includes(id); }
  coletar(id: number) { if (!this.tem(id)) this.ids.update(l => [...l, id]); }
  soltar(id: number) { this.ids.update(l => l.filter(x => x !== id)); }
}

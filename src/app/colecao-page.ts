import { Component, computed, inject } from '@angular/core';
import { CardItem } from './card-item';
import { ColecaoService } from './colecao.service';
import { MedidorObsessao } from './medidor-obsessao';
import { PokemonService } from './pokemon.service';

@Component({
  selector: 'app-colecao-page',
  imports: [CardItem, MedidorObsessao],
  template: `
    <div class="animate-surge">
      <h1 class="font-titulo text-4xl font-semibold sm:text-5xl">Coleção</h1>

      <div class="mt-8 grid gap-6 border-y border-white/10 py-6 sm:grid-cols-2 lg:grid-cols-3">
        <div>
          <p class="font-titulo text-5xl text-ouro" [class.animate-pulse]="colecao.intensidade() > 0.5">{{ colecao.total() }}</p>
          <p class="text-sm text-cinza">coletados</p>
        </div>
        <app-medidor-obsessao [valor]="colecao.intensidade()" [nivel]="colecao.nivel()" />
        <div>
          <p class="font-titulo text-5xl">{{ colecao.meta() }}</p>
          <p class="text-sm text-cinza">próxima meta</p>
        </div>
      </div>

      <div class="mt-8 grid grid-cols-2 gap-2 sm:grid-cols-4">
        @for (item of coletados(); track item.id) {
          <app-card-item
            [item]="item"
            [coletado]="true"
            [vezes]="vezesPorItem()[item.id] ?? 0"
            [inquieto]="inquieto()"
            (escolher)="soltar($event)" />
        } @empty {
          <p class="col-span-full text-cinza">Vazio. Você vai voltar.</p>
        }
      </div>
    </div>
  `,
})
export class ColecaoPage {
  pokemon = inject(PokemonService);
  colecao = inject(ColecaoService);
  inquieto = computed(() => this.colecao.intensidade() > 0.7);
  vezesPorItem = computed(() => {
    const mapa: Record<number, number> = {};
    const notas = this.colecao.notas();
    for (const [id, lista] of Object.entries(notas)) {
      mapa[Number(id)] = lista.reduce((total, nota) => total + nota.vezes, 0);
    }
    return mapa;
  });
  coletados = computed(() => this.pokemon.itens().filter(i => this.colecao.tem(i.id)));

  soltar(id: number) {
    if (confirm('Soltar este item? Ele vai querer voltar.')) this.colecao.soltar(id);
  }
}

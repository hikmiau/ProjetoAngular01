import { Component, inject } from '@angular/core';
import { CardItem } from './card-item';
import { ColecaoService } from './colecao.service';
import { PokemonService } from './pokemon.service';

@Component({
  selector: 'app-explorar',
  imports: [CardItem],
  template: `
    <div class="animate-surge">
      <h1 class="font-titulo text-4xl font-semibold sm:text-5xl">Explorar</h1>
      <p class="mt-3 text-cinza">
        <span class="font-titulo text-3xl text-ouro" [class.animate-pulse]="colecao.intensidade() > 0.5">
          {{ colecao.total() }} / {{ colecao.meta() }}
        </span>
        &nbsp;Só mais um.
      </p>

      <div class="mt-8 grid grid-cols-2 gap-2 sm:grid-cols-4">
        @if (pokemon.carregando()) {
          @for (n of esqueleto; track n) {
            <div class="aspect-square animate-pulse bg-superficie"></div>
          }
        } @else if (pokemon.erro()) {
          <div class="col-span-full">
            <p class="text-erro">Não foi possível carregar os itens.</p>
            <button (click)="pokemon.recarregar()" class="mt-2 border border-ouro px-4 py-2 text-ouro">
              Tentar de novo
            </button>
          </div>
        } @else {
          @for (item of pokemon.itens(); track item.id) {
            <app-card-item [item]="item" [coletado]="colecao.tem(item.id)" (escolher)="colecao.coletar($event)" />
          } @empty {
            <p class="col-span-full text-cinza">Nada para coletar. Por enquanto.</p>
          }
        }
      </div>
    </div>
  `,
})
export class Explorar {
  pokemon = inject(PokemonService);
  colecao = inject(ColecaoService);
  esqueleto = Array.from({ length: 8 }, (_, i) => i);
}

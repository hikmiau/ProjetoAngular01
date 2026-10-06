import { Component, computed, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ColecaoService } from './colecao.service';
import { PokemonService } from './pokemon.service';

@Component({
  selector: 'app-detalhe',
  imports: [RouterLink],
  template: `
    <div class="animate-surge">
      <h1 class="font-titulo text-4xl font-semibold sm:text-5xl">Detalhe</h1>

      @if (pokemon.carregando()) {
        <p class="mt-6 text-cinza">Carregando item...</p>
      } @else if (pokemon.erro()) {
        <div class="mt-6 border border-erro p-4">
          <p class="text-erro">Não foi possível carregar os itens.</p>
          <button type="button" (click)="pokemon.recarregar()" class="mt-3 border border-ouro px-4 py-2 text-ouro">
            Tentar de novo
          </button>
        </div>
      } @else if (item()) {
        <div class="mt-8 grid gap-6 border border-white/10 p-4 sm:grid-cols-2">
          <img
            [src]="item()!.imagem"
            [alt]="item()!.nome"
            class="w-full border border-white/10 bg-superficie p-4"
            [class]="coletado() ? 'w-full border border-white/10 bg-superficie p-4 drop-shadow-[0_0_14px_rgb(201_162_75/0.5)]' : 'w-full border border-white/10 bg-superficie p-4'"
          />

          <div class="flex flex-col justify-between gap-4">
            <div>
              <p class="text-sm text-cinza">ID {{ item()!.id }}</p>
              <p class="mt-1 font-titulo text-4xl capitalize">{{ item()!.nome }}</p>
              <p class="mt-3 text-sm" [class]="coletado() ? 'text-sucesso' : 'text-cinza'">
                {{ coletado() ? 'Coletado na reincidência.' : 'Ainda não coletado.' }}
              </p>
            </div>

            <button type="button" (click)="alternarColeta()" class="w-fit border px-4 py-2" [class]="coletado() ? 'border-vinho text-vinho' : 'border-ouro text-ouro'">
              {{ coletado() ? 'Soltar' : 'Coletar' }}
            </button>
          </div>
        </div>
      } @else {
        <div class="mt-6 border border-white/10 bg-superficie p-4">
          <p class="text-cinza">Este item escapou. Volte para explorar.</p>
          <a routerLink="/explorar" class="mt-3 inline-block border border-ouro px-4 py-2 text-ouro">Ir para explorar</a>
        </div>
      }
    </div>
  `,
})
export class Detalhe {
  id = input.required<string>();
  pokemon = inject(PokemonService);
  colecao = inject(ColecaoService);

  item = computed(() => this.pokemon.itens().find(item => String(item.id) === this.id()));
  coletado = computed(() => {
    const itemAtual = this.item();
    return itemAtual ? this.colecao.tem(itemAtual.id) : false;
  });

  alternarColeta() {
    const itemAtual = this.item();
    if (!itemAtual) return;
    if (!this.coletado()) {
      this.colecao.coletar(itemAtual.id);
      return;
    }
    if (confirm('Soltar este item? Ele vai querer voltar.')) this.colecao.soltar(itemAtual.id);
  }
}

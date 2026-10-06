import { Component, input, output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Item } from './pokemon.service';

@Component({
  selector: 'app-card-item',
  imports: [RouterLink],
  template: `
    <div class="relative w-full border bg-superficie p-3 transition-colors duration-500"
      [class]="coletado() ? 'border-ouro' : 'border-white/10 hover:border-ouro/50'">
      <a [routerLink]="['/item', item().id]" class="block">
        <img [src]="item().imagem" [alt]="item().nome"
          class="w-full transition-all duration-700"
          [class]="coletado() ? 'drop-shadow-[0_0_14px_rgb(201_162_75/0.5)]' : 'brightness-0 opacity-30'" />
        <p class="mt-2 text-sm capitalize" [class]="coletado() ? 'text-osso' : 'text-cinza'">
          {{ coletado() ? item().nome : '???' }}
        </p>
      </a>

      <button type="button" (click)="escolher.emit(item().id)" class="mt-3 w-full border px-3 py-2 text-sm"
        [class]="coletado() ? 'border-vinho text-vinho' : 'border-ouro text-ouro'">
        {{ coletado() ? 'Soltar' : 'Coletar' }}
      </button>
    </div>
  `,
})
export class CardItem {
  item = input.required<Item>();
  coletado = input(false);
  escolher = output<number>();
}

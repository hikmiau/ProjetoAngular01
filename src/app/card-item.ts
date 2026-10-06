import { Component, input, output } from '@angular/core';
import { Item } from './pokemon.service';

@Component({
  selector: 'app-card-item',
  template: `
    <button type="button" (click)="escolher.emit(item().id)"
      class="relative w-full border bg-superficie p-3 text-left transition-colors duration-500"
      [class]="coletado() ? 'border-ouro' : 'border-white/10 hover:border-ouro/50'">
      <img [src]="item().imagem" [alt]="item().nome"
        class="w-full transition-all duration-700"
        [class]="coletado() ? 'drop-shadow-[0_0_14px_rgb(201_162_75/0.5)]' : 'brightness-0 opacity-30'" />
      <p class="mt-2 text-sm capitalize" [class]="coletado() ? 'text-osso' : 'text-cinza'">
        {{ coletado() ? item().nome : '???' }}
      </p>
    </button>
  `,
})
export class CardItem {
  item = input.required<Item>();
  coletado = input(false);
  escolher = output<number>();
}

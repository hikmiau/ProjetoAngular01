import { Component, computed, input } from '@angular/core';

@Component({
  selector: 'app-medidor-obsessao',
  template: `
    <div>
      <p class="text-sm text-cinza">nível</p>
      <p class="font-titulo text-3xl capitalize">{{ nivel() }}</p>
      <div class="mt-3 h-3 w-full border border-white/10 bg-superficie">
        <div class="h-full bg-ouro transition-[width] duration-700" [style.width.%]="largura()"></div>
      </div>
    </div>
  `,
})
export class MedidorObsessao {
  valor = input(0);
  nivel = input('');

  largura = computed(() => {
    const valorNormalizado = Math.max(0, Math.min(1, this.valor()));
    return valorNormalizado * 100;
  });
}

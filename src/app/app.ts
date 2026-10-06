import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { ColecaoService } from './colecao.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  template: `
    <div class="fundo min-h-screen font-texto" [style.--i]="colecao.intensidade()">
      <header class="flex items-center justify-between border-b border-white/10 px-6 py-4">
        <span class="font-titulo text-2xl font-semibold">Reincidência</span>
        <nav class="flex gap-6 text-sm text-cinza">
          <a routerLink="/explorar" routerLinkActive="!text-ouro border-b border-ouro" class="pb-1 transition-colors hover:text-osso">Explorar</a>
          <a routerLink="/colecao" routerLinkActive="!text-ouro border-b border-ouro" class="pb-1 transition-colors hover:text-osso">Coleção</a>
        </nav>
      </header>
      <main class="mx-auto max-w-5xl px-6 py-10"><router-outlet /></main>
    </div>
  `,
})
export class App {
  colecao = inject(ColecaoService);
}

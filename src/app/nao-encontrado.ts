import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-nao-encontrado',
  imports: [RouterLink],
  template: `
    <h1 class="font-titulo text-5xl">Não encontrado. Ainda.</h1>
    <a routerLink="/explorar" class="mt-6 inline-block border border-ouro px-4 py-2 text-ouro">Voltar a explorar</a>
  `,
})
export class NaoEncontrado {}

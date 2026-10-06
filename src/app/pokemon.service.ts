import { Injectable, computed } from '@angular/core';
import { httpResource } from '@angular/common/http';

export interface Item { id: number; nome: string; imagem: string; }
interface Lista { results: { name: string; url: string }[]; }

const ARTE = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/';

@Injectable({ providedIn: 'root' })
export class PokemonService {
  private lista = httpResource<Lista>(() => 'https://pokeapi.co/api/v2/pokemon?limit=24');

  readonly carregando = this.lista.isLoading;
  readonly erro = this.lista.error;
  readonly itens = computed<Item[]>(() =>
    (this.lista.value()?.results ?? []).map(r => {
      const id = Number(r.url.split('/').filter(Boolean).pop());
      return { id, nome: r.name, imagem: `${ARTE}${id}.png` };
    }),
  );

  recarregar() { this.lista.reload(); }
}

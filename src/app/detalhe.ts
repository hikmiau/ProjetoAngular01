import { Component, computed, inject, input } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ColecaoService } from './colecao.service';
import { PokemonService } from './pokemon.service';

@Component({
  selector: 'app-detalhe',
  imports: [RouterLink, ReactiveFormsModule],
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
      } @else if (item(); as itemAtual) {
        <div class="mt-8 grid gap-6 border border-white/10 p-4 sm:grid-cols-2">
          <img
            [src]="itemAtual.imagem"
            [alt]="itemAtual.nome"
            [class]="coletado() ? 'w-full border border-white/10 bg-superficie p-4 drop-shadow-[0_0_14px_rgb(201_162_75/0.5)]' : 'w-full border border-white/10 bg-superficie p-4'"
          />

          <div class="flex flex-col justify-between gap-4">
            <div>
              <p class="text-sm text-cinza">ID {{ itemAtual.id }}</p>
              <p class="mt-1 font-titulo text-4xl capitalize">{{ itemAtual.nome }}</p>
              <p class="mt-3 text-sm" [class]="coletado() ? 'text-sucesso' : 'text-cinza'">
                {{ coletado() ? 'Coletado na reincidência.' : 'Ainda não coletado.' }}
              </p>
              <p class="mt-1 text-sm text-cinza">Total anotado: {{ totalVezesAnotadas() }}</p>
            </div>

            <button type="button" (click)="alternarColeta()" class="w-fit border px-4 py-2" [class]="coletado() ? 'border-vinho text-vinho' : 'border-ouro text-ouro'">
              {{ coletado() ? 'Soltar' : 'Coletar' }}
            </button>
          </div>
        </div>

        <form [formGroup]="formularioNota" (ngSubmit)="anotar()" class="mt-6 border border-white/10 bg-superficie p-4">
          <h2 class="font-titulo text-2xl">Anotar por que voltei</h2>

          <label class="mt-4 block text-sm text-cinza" for="motivo">Motivo</label>
          <textarea
            id="motivo"
            formControlName="motivo"
            rows="3"
            class="mt-1 w-full border border-white/10 bg-carvao p-2 text-osso"
          ></textarea>
          @if (motivoInvalido('required')) {
            <p class="mt-1 text-sm text-erro">Informe um motivo.</p>
          } @else if (motivoInvalido('minlength')) {
            <p class="mt-1 text-sm text-erro">Use pelo menos 5 caracteres.</p>
          }

          <label class="mt-4 block text-sm text-cinza" for="vezes">Vezes</label>
          <input
            id="vezes"
            type="number"
            formControlName="vezes"
            class="mt-1 w-full border border-white/10 bg-carvao p-2 text-osso"
          />
          @if (vezesInvalido('required')) {
            <p class="mt-1 text-sm text-erro">Informe quantas vezes.</p>
          } @else if (vezesInvalido('min') || vezesInvalido('max')) {
            <p class="mt-1 text-sm text-erro">Use um valor entre 1 e 99.</p>
          }

          <button type="submit" class="mt-4 border border-ouro px-4 py-2 text-ouro disabled:border-white/10 disabled:text-cinza" [disabled]="formularioNota.invalid">
            Anotar
          </button>
        </form>

        <div class="mt-6 border border-white/10 p-4">
          <h2 class="font-titulo text-2xl">Notas do item</h2>
          <div class="mt-4 grid grid-cols-2 gap-2 lg:grid-cols-4">
            @for (nota of notasDoItem(); track nota.criadaEm) {
              <article class="border border-white/10 bg-superficie p-3">
                <p class="text-sm text-cinza">{{ nota.vezes }} vez(es)</p>
                <p class="mt-2 text-sm">{{ nota.motivo }}</p>
              </article>
            } @empty {
              <p class="col-span-full text-cinza">Sem anotações. Ainda.</p>
            }
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
  private formBuilder = inject(FormBuilder);

  item = computed(() => this.pokemon.itens().find(item => String(item.id) === this.id()));
  coletado = computed(() => {
    const itemAtual = this.item();
    return itemAtual ? this.colecao.tem(itemAtual.id) : false;
  });
  formularioNota = this.formBuilder.nonNullable.group({
    motivo: ['', [Validators.required, Validators.minLength(5)]],
    vezes: [1, [Validators.required, Validators.min(1), Validators.max(99)]],
  });
  notasDoItem = computed(() => {
    const itemAtual = this.item();
    if (!itemAtual) return [];
    return this.colecao.notasDoItem(itemAtual.id);
  });
  totalVezesAnotadas = computed(() =>
    this.notasDoItem().reduce((total, nota) => total + nota.vezes, 0),
  );

  alternarColeta() {
    const itemAtual = this.item();
    if (!itemAtual) return;
    if (!this.coletado()) {
      this.colecao.coletar(itemAtual.id);
      return;
    }
    if (confirm('Soltar este item? Ele vai querer voltar.')) this.colecao.soltar(itemAtual.id);
  }

  anotar() {
    const itemAtual = this.item();
    if (!itemAtual) return;
    if (this.formularioNota.invalid) {
      this.formularioNota.markAllAsTouched();
      return;
    }
    const { motivo, vezes } = this.formularioNota.getRawValue();
    this.colecao.anotar(itemAtual.id, motivo, vezes);
    this.formularioNota.reset({ motivo: '', vezes: 1 });
  }

  motivoInvalido(erro: string) {
    const controleMotivo = this.formularioNota.controls.motivo;
    return controleMotivo.touched && controleMotivo.hasError(erro);
  }

  vezesInvalido(erro: string) {
    const controleVezes = this.formularioNota.controls.vezes;
    return controleVezes.touched && controleVezes.hasError(erro);
  }
}

import { Routes } from '@angular/router';
import { ColecaoPage } from './colecao-page';
import { Explorar } from './explorar';
import { NaoEncontrado } from './nao-encontrado';

export const routes: Routes = [
  { path: '', redirectTo: 'explorar', pathMatch: 'full' },
  { path: 'explorar', component: Explorar },
  { path: 'colecao', component: ColecaoPage },
  // TODO (seu): { path: 'item/:id', component: Detalhe }
  { path: '**', component: NaoEncontrado },
];

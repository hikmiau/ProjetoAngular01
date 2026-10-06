# Reincidência

Coleção que nunca fecha: sempre existe mais um item para voltar e guardar.

## Tecnologias

- Angular standalone (sem NgModules)
- Signals e computed
- Reactive Forms
- Tailwind CSS v4
- SSR com Angular

## Como rodar

```bash
npm install
ng serve
```

A aplicação abre em `http://localhost:4200/`.

## Rotas

- `/explorar`: grade de itens para coletar
- `/colecao`: itens coletados e progresso
- `/item/:id`: detalhe do item, coleta/soltura e anotações
- `**`: página não encontrada

## Requisitos técnicos cobertos

- Roteamento principal: `src/app/app.routes.ts`
- Binding de parâmetros da rota com `withComponentInputBinding`: `src/app/app.config.ts`
- Ajuste SSR para rota dinâmica: `src/app/app.routes.server.ts`
- Página de detalhe com `input.required`, `computed`, loading/erro e ação coletar/soltar: `src/app/detalhe.ts`
- Card com link para detalhe e botão de ação separado: `src/app/card-item.ts`
- Estado da coleção (`ids`, `total`, `meta`, `intensidade`, `nivel`): `src/app/colecao.service.ts`
- Notas do item em signal `Record<number, Nota[]>`: `src/app/colecao.service.ts`
- Formulário reativo com validações e listagem de notas: `src/app/detalhe.ts`
- Componente reutilizável de barra (`MedidorObsessao`): `src/app/medidor-obsessao.ts`
- Uso do medidor na página de coleção: `src/app/colecao-page.ts`
- Tema visual (cores e fontes): `src/styles.css`

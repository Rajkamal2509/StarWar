import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CharacterListComponent } from './pages/character-list/character-list.component';
import { CharacterDetailComponent } from './pages/character-detail/character-detail.component';


const routes: Routes = [
  { path: "", pathMatch: "full", redirectTo: "characterList" },
  { path: 'characters/:id', component: CharacterDetailComponent },
  { path: 'characterList', component: CharacterListComponent },
];


@NgModule({
  imports: [RouterModule.forRoot(routes,{ useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }

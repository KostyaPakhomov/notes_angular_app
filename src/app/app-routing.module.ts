import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {NotesContainerComponent} from './notes-container/notes-container.component';

const routes: Routes = [
  {path: '', redirectTo: '/notes', pathMatch: 'full'},
  {path: 'notes', component: NotesContainerComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { RouterModule, Routes } from '@angular/router';

import { CategoriesResolver } from './categories.resolver';
import { JokeFormComponent } from './joke-form';
import { JokesComponent } from './jokes.component';

const routes: Routes = [
  {
    path: '',
    component: JokesComponent,
    resolve: { categories: CategoriesResolver },
  },
];
@NgModule({
  imports: [
    RouterModule.forChild(routes),
    CommonModule,

    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  declarations: [JokeFormComponent, JokesComponent],
})
export class JokesModule {}

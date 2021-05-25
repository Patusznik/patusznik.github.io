import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { RouterModule, Routes } from '@angular/router';

import { SharedModule } from '../shared';
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

    MatIconModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    FormsModule,

    SharedModule,
  ],
  declarations: [JokeFormComponent, JokesComponent],
})
export class JokesModule {}

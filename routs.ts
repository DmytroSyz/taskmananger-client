import { Routes} from '@angular/router';
import {TodosComponent} from './src/app/components/todos/todos.component';
import {AddTaskComponent} from './src/app/components/add-task/add-task.component';
import {EditTaskComponent} from './src/app/components/edit-task/edit-task.component';
import {LoginComponent} from './src/app/components/login/login.component';
import {SignUpComponent} from './src/app/components/sign-up/sign-up.component';

export const appRouts: Routes = [
  { path: '', component: TodosComponent },
  { path: 'addTask', component: AddTaskComponent },
  { path: 'editTask', component: EditTaskComponent },
  { path: 'login', component: LoginComponent },
  { path: 'sign-up', component: SignUpComponent }

];


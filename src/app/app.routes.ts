import {Routes} from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {ListMembersComponent} from "./list-members/list-members.component";
import {NewMemberComponent} from "./new-member/new-member.component";

export const routes: Routes = [
  {
    path: 'home', component: HomeComponent
  },
  {
    path: 'list-members',
    component: ListMembersComponent
  },
  {
    path: 'new-member',
    component: NewMemberComponent
  },
  {
    path: '', redirectTo: 'home', pathMatch: 'full'
  },
  {
    path: '**', redirectTo: 'home'
  }
];

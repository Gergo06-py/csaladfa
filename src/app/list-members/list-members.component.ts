import { Component } from '@angular/core';
import {BaseService} from "../base.service";
import {JsonPipe, NgForOf, NgIf} from "@angular/common";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-list-members',
  standalone: true,
  imports: [
    NgForOf,
    JsonPipe,
    FormsModule,
    NgIf
  ],
  providers: [BaseService],
  templateUrl: './list-members.component.html',
  styleUrl: './list-members.component.css'
})
export class ListMembersComponent {
  familyMembers: any = [];
  baseUrl: string;
  titles: any = [];

  constructor(private base: BaseService) {
    this.titles = this.base.titles;
    this.baseUrl = this.base.baseUrl;
    this.getMembers();
  }

  getMembers() {
    let url = this.baseUrl + '/members';
    this.base.getData(url).subscribe((data: any) => {
      this.familyMembers = data;
    });
  }
}

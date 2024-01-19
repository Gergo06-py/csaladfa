import { Component } from '@angular/core';
import {BaseService} from "../base.service";
import {JsonPipe, NgForOf, NgIf} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {Observable} from "rxjs";

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

  updateMember(member: any) {
    let memberID = member.id;
    let url = this.baseUrl + '/update-member/' + memberID;
    delete member['_id'];
    delete member['id'];
    this.base.putData(url, member).subscribe((data: any) => {
      this.confirmationAnimation(memberID).then(() => {
        this.getMembers();
      });
    });
  }

  deleteMember(id: number) {
    let url = this.baseUrl + '/delete-member/' + id;
    this.base.deleteData(url).subscribe((data: any) => {
      this.getMembers();
    });
  }

  confirmationAnimation(id: string) {
    let button = document.getElementById('member-' + id) as HTMLButtonElement;
    button.classList.remove("btn-warning");
    button.classList.add("btn-success");
    button.textContent = "Módosítva";
    return new Promise((resolve) => setTimeout(() => {
      button.classList.remove("btn-success");
      button.classList.add("btn-warning");
      button.textContent = "Módosít";
      return resolve;
    }, 1000));
  }
}

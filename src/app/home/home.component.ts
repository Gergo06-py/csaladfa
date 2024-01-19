import { Component } from '@angular/core';
import {BaseService} from "../base.service";
import {JsonPipe, NgForOf, NgIf} from "@angular/common";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    NgForOf,
    NgIf,
    JsonPipe
  ],
  providers: [BaseService],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  members: any = [];
  titles = this.base.titles;
  popupVisible = false;
  selectedMemberID: number = 1;
  constructor(private base: BaseService) {
    let url = this.base.baseUrl + '/members';
    this.base.getData(url).subscribe((data: any) => {
      this.members = data;
    });
  }

  switchPopupState(id?: number) {
    this.selectedMemberID = id ?? -1;
    this.popupVisible = !this.popupVisible;
  }
}

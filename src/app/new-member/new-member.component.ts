import {Component} from '@angular/core';
import {BaseService} from "../base.service";
import {NgForOf, NgIf} from "@angular/common";
import {Router} from "@angular/router";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-new-member',
  standalone: true,
  imports: [
    NgForOf,
    NgIf,
    FormsModule
  ],
  providers: [BaseService],
  templateUrl: './new-member.component.html',
  styleUrl: './new-member.component.css'
})
export class NewMemberComponent {
  baseUrl: string;
  titles: any = [];
  newMember: any = {
    name: "",
    birthdate: "",
    birthplace: "",
    mothername: "",
    fathername: "",
    deathdate: "",
    deathplace: ""
  };

  constructor(private base: BaseService, private router: Router) {
    this.titles = this.base.titles;
    this.baseUrl = this.base.baseUrl;
  }

  addMember() {
    let url = this.baseUrl + '/new-member';
    this.base.postData(url, this.newMember).subscribe(
      () => this.router.navigate(['/list-members'])
    );
  }
}

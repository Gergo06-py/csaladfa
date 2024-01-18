import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class BaseService {
  baseUrl: string = 'http://localhost:3000';
  titles = [
    {key: "id", name: "ID", type: "number", required: true},
    {key: "name", name: "Név", type: "text", required: true},
    {key: "birthdate", name: "Születési dátum", type: "date", required: true},
    {key: "birthplace", name: "Születési hely", type: "text", required: true},
    {key: "mothername", name: "Anyja neve", type: "text", required: true},
    {key: "fathername", name: "Apja neve", type: "text", required: true},
    {key: "deathdate", name: "Elhalálozás dátuma", type: "date", required: false},
    {key: "deathplace", name: "Elhalálozás helye", type: "text", required: false},
  ];

  constructor(private http: HttpClient) { }

  getData(url: string) {
    return this.http.get(url);
  }

  postData(url: string, data: any) {
    return this.http.post(url, data);
  }

  putData(url: string, data: any) {
    return this.http.put(url, data);
  }

  deleteData(url: string) {
    return this.http.delete(url);
  }
}

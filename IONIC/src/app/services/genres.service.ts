import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {genres} from "../common/genres";

@Injectable({
  providedIn: 'root'
})
export class GenresService {
  baseUrl = "http://localhost:3000/ASU/genres"

  constructor(private http: HttpClient) {}

  getGenresList(): Observable<genres[]>{
    return this.http.get<genres[]>(this.baseUrl + "/")
  }

}

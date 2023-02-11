import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Interfaces} from "../common/interfaces";

@Injectable({
  providedIn: 'root'
})
export class DataService {
  baseUrl = "http://localhost:3000/ASU/movies"



  constructor(private http: HttpClient) { }


  getSerieList(): Observable<Interfaces[]>{
    return this.http.get<Interfaces[]>(this.baseUrl + "/")
  }

  getSerie(id: string): Observable<Interfaces>{
    return this.http.get<Interfaces>(this.baseUrl + "/movie/" + id)
  }

  updateSerie(id: string, data: Interfaces): Observable<any>{
    return this.http.put(this.baseUrl + "/" + id, data)
  }

}

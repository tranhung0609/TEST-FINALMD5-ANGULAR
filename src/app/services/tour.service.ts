import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Tour} from "../models/tour";
import {environment} from "../../environments/environment";
const API_URL= environment.apiUrl
@Injectable({
  providedIn: 'root'
})
export class TourService {

  constructor(private http: HttpClient) { }

  getAllTours(): Observable<Tour[]> {
    return this.http.get<Tour[]>(API_URL);
  }

  getToursById(id: number): Observable<Tour>{
    return this.http.get<Tour>(API_URL + '/' + id);
  }

  createTours(tour: Tour): Observable<any> {
    return this.http.post<any>(API_URL, tour);
  }

  updateTours(id: number, tour: Tour): Observable<any> {
    return this.http.put(`${API_URL}/${id}`, tour);
  }

  deleteTours(id: number): Observable<any> {
    return this.http.delete<any>(API_URL + '/' + id);
  }
}

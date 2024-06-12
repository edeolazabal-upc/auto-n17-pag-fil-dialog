import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Auto } from '../model/auto';

const base_url = "http://localhost:3000/autos"
// const base_url = "https://glorious-garbanzo-r4r4wwxxpp56f5476-3000.app.github.dev/autos"
//const base_url = 'http://127.0.0.1:3000/autos'
//const base_url = 'http://localhost:8081/api/auto'

@Injectable({
  providedIn: 'root'
})
export class AutoService {

  constructor(private http: HttpClient) { }

  getAutos() {
    const endpoint = `${base_url}`;
    return this.http.get<Auto[]>(endpoint)
  }
  getAutosById(id: any) {
    const endpoint = `${base_url}/${id}`;
    return this.http.get<Auto>(endpoint)
  }
  saveAuto(body: any) {
    const endpoint = `${base_url}`;
    return this.http.post<Auto>(endpoint, body)
  }
  updateAuto(body: any, id: any) {
    const endpoint = `${base_url}/${id}`;
    return this.http.put<Auto>(endpoint, body)
  }
  deleteAuto(id: any) {
    const endpoint = `${base_url}/${id}`;
    return this.http.delete<Auto>(endpoint)

  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SERVICE_URL } from 'src/app/globals/globals.component';

@Injectable({
  providedIn: 'root'
})
export class BlackJackService {

  constructor(
    private http: HttpClient
  ) { }
  
  start(){
    const url =  SERVICE_URL + '/new/shuffle/?deck_count=1';
    return this.http.get( url);
  }
  draw_card(id_shuffle: String){
    const url =  SERVICE_URL + '/' + id_shuffle + '/draw/?count=1';
    return this.http.get( url);
  }
}

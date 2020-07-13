import { Component, Inject } from '@angular/core';
import { HttpClient, HttpParams, HttpHandler, HttpInterceptor, HttpRequest, HttpEvent, HttpHeaders } from '@angular/common/http';
import { strict } from 'assert';

//const path = require('path');
var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
@Component({
  selector: 'app-Juego',
  templateUrl: 'juego.component.html',
})
export class JuegoComponent {

    public baraja: Baraja = { success:true, deck_id:"",shuffled:false,remaining:0,baraja:null};
    srcPath(){
          return "";
        }
    generarBaraja(){
      let cartas:Carta[] = [];
      this.baraja.success=true;
      var result;
      for (let i = 0; i < 5; i++) {
        result += characters.charAt(Math.floor(Math.random() * 20));
      }
      this.baraja.deck_id = result.toString();
      this.baraja.shuffled =false;
      this.baraja.remaining = 52;
      let tipos = ['Hearts','Clubs','Spades','Diamonds'];
      tipos.forEach(tipo => {
        for(let i=1;i<14;i++){
          let code =this.getCode(tipo,i);
          let valorCarta;
          if(i==1){
            valorCarta = "Ace";
          }
          else if(i==11){
            valorCarta = "Jack";
          }
          else if(i==12){
            valorCarta = "Queen";
          } else if(i==13){
            valorCarta = "King";
          }
          else{
            valorCarta = i.toString();
          }
          let carta:Carta = { image:this.getImage(code), value:valorCarta, suit:tipo,code:code}
          cartas.push(carta);
        }
      });
      this.baraja.baraja = cartas;
      console.log(this.baraja);
      this.GetBaraja(this.baraja);
    }
    getCode(tipo:string, numero:number){
      let result;
      let numchar;
      if(numero==1){
        numchar = "A";
      }
      else if(numero==11){
        numchar = "J";
      }
      else if(numero==12){
        numchar = "Q";
      } else if(numero==13){
        numchar = "K";
      }
      else{
        numchar = numero.toString();
      }

      switch(tipo){
        case'Clubs':{
          result = numchar+"C";
          break; 
        }
        case'Diamonds':{
          result = numchar+"D";
          break; 
        }
        case'Hearts':{
          result = numchar+"H";
          break; 
        }
        case'Spades':{
          result = numchar+"S";
          break; 
        }
      }
      return result;
    }
    getImage(code:string)
    {
      /*const app = require('electron').remote.app;
      return app.app.getAppPath()+"/Baraja/"+code+".png";*/
      return this.srcPath()+"/Baraja/"+code+".png";
    }

    constructor(public http: HttpClient, @Inject('BASE_URL') public baseUrl: string) {
     this.refresh();
    }
    ///Trae la baraja y llama al  metodo de revolver 
    GetBaraja(baraja:Baraja){
      this.http.post<Baraja[]>(this.baseUrl + 'api/Juego',baraja).subscribe(result => {
        
      }, error => console.error(error));
    }
  
    //Trae una carta solicitada por el jugador
    getCarta(cant:number){
      this.http.post<Baraja[]>(this.baseUrl + 'api/Juego',cant).subscribe(result => {
      }, error => console.error(error));
    }
    /// Revuelve las cartas antes de jugar 
    Revolver(deck_id){
      this.http.post<Baraja[]>(this.baseUrl + 'api/Juego',deck_id).subscribe(result => {
      }, error => console.error(error));

    }
    //Pide las cartas de la casa y valida quien gano, si gana el usuario, llama al metodo que guarda la cantidad de ganadas y perdidas, inicia un nuevo juego
    playCasa(){
      this.http.post<Baraja[]>(this.baseUrl + 'api/Juego',2).subscribe(result => {
      }, error => console.error(error));
    }

   // Suma la cantidad de  partidad ganadas o perdidas
   sumarPuntos(){

   }



   refresh(){
    this.http.get<Baraja[]>(this.baseUrl + 'api/Juego').subscribe(result => {
    }, error => console.error(error));
  }

}
interface Baraja {
  success:boolean,
  deck_id:string;
  shuffled:boolean;
  remaining:number;
  baraja:Carta[]
}
interface Carta {
  image:string;
  value:string;
  suit:string;
  code:string;
}
interface jugador {
  ganadas:number;
  perdidas:number;
}
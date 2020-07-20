import Swal from 'sweetalert2';
import { Component, OnInit } from '@angular/core';
import { BlackJackService } from '../services/black_jack/black-jack.service';

@Component({
  selector: 'app-main-view',
  templateUrl: './main-view.component.html',
  styleUrls: ['./main-view.component.css']
})
export class MainViewComponent implements OnInit {

  public sum;
  public sum_home;
  public image: String;
  public image_home: String;
  public id_shuffle : String;
  public stay: Boolean;
  public game_over: Boolean;
  public user_cards: any = [];
  public home_cards: any = [];
  public game_wins = {
    user: 0,
    home: 0
  }
  public first_time: Boolean = true;

  constructor(
    private _card_service: BlackJackService
  ) { }
    
  ngOnInit(): void {
    this.start();
    this.sum = 0;
    this.sum_home = 0;
    this.game_over = false;
    this.load_in_local_storage();
  }

  stay_game(){
    this.first_time = true;
    if(this.stay){
      if(this.sum == this.sum_home){
        this.won_message('The same result, but the home the house always wins!!!');
        this.save_in_local_storage('home');
        this.game_over = true;
      }else if(this.sum > this.sum_home){
        this.won_message('Congratulations user won with ' + this.sum + ' points.\n' + 
        ' and home lose with ' + this.sum_home + ' points.');
        this.game_over = true;
        this.save_in_local_storage('user');
      }else{
        this.won_message('Congratulations home won with ' + this.sum_home + ' points.\n' + 
        ' and user lose with ' + this.sum + ' points.');
        this.game_over = true;
        this.save_in_local_storage('home');
      }
    }
    this.stay = true;
  }

  async start(){
    await this._card_service.start().toPromise()
    .then((res) => {
      this.id_shuffle = res['deck_id'];
    })
    .catch(err => {
      console.log(JSON.stringify(err));
    });
  }


  async pedir_carta(){
    if(this.first_time === true){
      this. first_time = false;
      await this._card_service.start_game(this.id_shuffle).toPromise()
        .then((res) => {
          let card = res['cards'];
          if(!this.stay){
            card.forEach(element => {
              this.image = element.image;
              this.user_cards.push(this.image);
              this.sum_card_user(element.value);
            });
          }else{
            card.forEach(element => {
              this.image_home = element.image;
              this.home_cards.push(this.image_home);
              this.sum_card_user(element.value);
            });
          }
      })
      .catch(err => {
        console.log(JSON.stringify(err));
      });
    }else{
      await this._card_service.draw_card(this.id_shuffle).toPromise()
        .then((res) => {
          let card = res['cards'];
          if(!this.game_over){
            if(!this.stay){
              this.image = card[0].image;
              this.user_cards.push(this.image);
            }else{
              this.image_home = card[0].image;
              this.home_cards.push(this.image_home);
            }
            this.sum_card_user(card[0].value);
          }else{
            this.lose_message('El juego termino, debe iniciar de nuevo una partida.');
          }
        })
      .catch(err => {
        console.log(JSON.stringify(err));
      });
    }
  }
  new_game(){
    this.game_over = false;
    this.image = '';
    this.image_home = '';
    this.sum = 0;
    this.sum_home = 0;
    this.stay = false;
    this.start();
    this.home_cards = [];
    this.user_cards = [];
    this.first_time =  true;
  }

  save_in_local_storage(who: string){
    if(who === 'user'){
      this.game_wins.user = this.game_wins.user + 1;
    }else{
      this.game_wins.home = this.game_wins.home + 1;
    }
    localStorage.setItem("games", JSON.stringify(this.game_wins));
  }

  load_in_local_storage(){
    if(JSON.parse(localStorage.getItem("games")) != null){
      this.game_wins = JSON.parse(localStorage.getItem("games"));
    }
  }

  sum_card_user(card_value: string){
    let value = parseInt(card_value)
    if(card_value == 'JACK'){
      value = 11;
    } else if (card_value == 'KING'){
      value = 12;
    } else if (card_value == 'QUEEN'){
      value = 13;
    } else if (card_value == 'ACE'){
      if((this.sum + value) < 21 ){
        value = 14;
      }else{
        value = 1;
      }
    }
    if(!this.stay){
      this.sum += value;
      if(this.sum == 21){
        this.won_message('Congratulations user won with ' + this.sum + ' points.');
        this.game_over = true;
        this.save_in_local_storage('user');
      } else if(this.sum  >= 21){
        this.lose_message('Bad luck user lose with ' + this.sum + ' points.');
        this.game_over = true;
        this.save_in_local_storage('home');
      }
    }
    else{
      this.sum_home += value;
      if(this.sum_home == 21){
        this.won_message('Congratulations home won with ' + this.sum_home + ' points.\n' + 
        ' and user lose with ' + this.sum + ' points.');
        this.game_over = true;
        this.save_in_local_storage('home');
      } else if(this.sum_home  >= 21){
        this.won_message('Congratulations user won with ' + this.sum + ' points.\n' + 
        ' and home lose with ' + this.sum_home + ' points.');
        this.game_over = true;
        this.save_in_local_storage('user');
      }
    }
  }

  won_message(message: string){
    Swal.fire({
      icon: 'success',
      title: message,
      showConfirmButton: false
    })
  }

  lose_message(message: string){
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: message,
    })
  }

}

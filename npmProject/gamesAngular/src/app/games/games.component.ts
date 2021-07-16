import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AddGameComponent } from '../add-game/add-game.component';
import { Game, GamesService } from '../services/games.service';

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.css']
})
export class GamesComponent implements OnInit {

  constructor(private gameService: GamesService) { }

  games!:Game[];
  @ViewChild(AddGameComponent) addGame!: AddGameComponent;

  ngOnInit(): void {

    
    this.getAllGames();

  }

   getAllGames(){
    this.gameService.getGames().then(games =>{
      this.games = games;
    })
  }

  onSubmit(){
    console.log(this.addGame.gameForm)
  }

}

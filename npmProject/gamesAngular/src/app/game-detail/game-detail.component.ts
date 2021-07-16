import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AddGameComponent, Type } from '../add-game/add-game.component';
import { Game, GamesService } from '../services/games.service';

@Component({
  selector: 'app-game-detail',
  templateUrl: './game-detail.component.html',
  styleUrls: ['./game-detail.component.css']
})
export class GameDetailComponent implements OnInit {

  constructor(private gameService: GamesService, private route: ActivatedRoute, private router: Router) { }
  game: Game = new Game();
  
  id = this.route.snapshot.params.id;


  @ViewChild(AddGameComponent) addGame!: AddGameComponent;


  ngOnInit(): void {
    console.log(this.game)
    this.getGame()
    this.addGame.type = Type.Update;
    this.addGame.id = this.id;
    console.log(this.addGame.gameForm)
  }
  

  getGame(){
    
    this.gameService.getGame(this.id).then(game =>{
      
      this.game = game;
      
    })
  }

  delete(){
    this.gameService.deleteGame(this.id).then(this.redirectToHome)
  }
  
  update(){
    
  }
  redirectToHome = () => { // use of arrow function for accessing parent context
    this.router.navigate(['']);
  }
}

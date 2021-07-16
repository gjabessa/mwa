import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { Game, GamesService } from '../services/games.service';

export enum Type{
  Add,
  Update
}
@Component({
  selector: 'app-add-game',
  templateUrl: './add-game.component.html',
  styleUrls: ['./add-game.component.css']
})

export class AddGameComponent implements OnInit {

  constructor(private gameService: GamesService, private snackBar: MatSnackBar, private route: ActivatedRoute) { }
  gameForm = new FormGroup({
    title: new FormControl(''),
    rate: new FormControl(''),
    year: new FormControl(''),
    price: new FormControl(''),
    minPlayers: new FormControl(''),
    maxPlayers: new FormControl('')
  })
  game!: Game;

  type: Type = Type.Add;

  id!: string;

  ngOnInit(): void {
  }

  onSubmit(){
    if(this.type == Type.Add){
        this.gameService.addGame(this.gameForm.value).then(response => {
          this.snackBar.open('Game Added Succesfully!');
          this.game=response;
         
        })
    } else if( this.type == Type.Update){
      
      this.gameService.updateGame(this.gameForm.value, this.id).then(response => {
        this.snackBar.open('Game Updated Succesfully!');
        this.game=response;
      })
    }
  }

}

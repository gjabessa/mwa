import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { GamesService } from '../services/games.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private snackBar: MatSnackBar, private gameService: GamesService) { }

  registerForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
    name: new FormControl('')
  })
  

  ngOnInit(): void {
  }

  onSubmit(){
    this.gameService.registerUser(this.registerForm.value).then(data =>{
      this.snackBar.open('Successfully Registered!');
    })
  }

}

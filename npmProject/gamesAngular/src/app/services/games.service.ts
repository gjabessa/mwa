import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

export class Game{
  title!: string;
  rate!: number;
  year!: number;
  price!: number;
  minPlayers!: number;
  maxPlayers!: number;
  _id!: number;
}
@Injectable({
  providedIn: 'root'
})
export class GamesService {

  constructor(private http: HttpClient) { }
  baseUrl = "http://localhost:5050/api";
  getGames():Promise<Game[]>{
    return this.http.get<Game[]>(this.baseUrl+"/games/").toPromise().then(this.complete).catch(this.failed)
  }

  addGame(game: Game):Promise<Game>{
    return this.http.post<Game>(this.baseUrl+"/games/",game).toPromise().then(this.complete).catch(this.failed)
  }

  updateGame(game: Game, id: String):Promise<Game>{
    return this.http.put<Game>(this.baseUrl+"/games/"+id,game).toPromise().then(this.complete).catch(this.failed)
  }

  getGame(id: string):Promise<Game>{
    return this.http.get<Game>(this.baseUrl+"/games/"+id).toPromise().then(this.complete).catch(this.failed)
  }

  deleteGame(id: string): Promise<Game>{
    return this.http.delete<Game>(this.baseUrl+"/games/"+id).toPromise().then(this.complete).catch(this.failed)
  }

  registerUser(user:any): Promise<any>{
    return this.http.post(this.baseUrl+"/users",user).toPromise().then(this.complete).catch(this.failed);
  }
  complete(data: any){
    return data;
  }
  failed(error: any): Promise<any> {
    return Promise.reject(error.message || error)
  }

}


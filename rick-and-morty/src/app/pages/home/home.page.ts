import { Component, OnInit } from '@angular/core';
import { RickAndMortyService } from 'src/app/services/rick-and-morty.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss']
})
export class HomePage implements OnInit {

  characters: any[] = [];
  params = {} as any;

  constructor(
    private rickAndMortyService: RickAndMortyService
  ) { }

  ngOnInit() {
    this.params.page = 0;
    this.getCharacters()
  }

  /** Obtener Personajes **/
  getCharacters(event?: any) {
    this.params.page += 1;

    this.rickAndMortyService.getCharacters(this.params).subscribe({
      next: (res: any) => {
        this.characters.push(...res.results)
        console.log(this.characters);
        if(event) event.target.complete();
      },
      error: (error: any) => {
        console.log(error);
        if(event) event.target.complete();
      }
    })
  }

  /** Buscar Personajes Por Nombre **/
  searchCharacters() {
    this.params.page = 1;

    this.rickAndMortyService.getCharacters(this.params).subscribe({
      next: (res: any) => {
        this.characters = res.results;
      },
      error: (error: any) => {
      }
    })
  }

}

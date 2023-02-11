import { Component, OnInit } from '@angular/core';
import {genres} from "../../common/genres";
import {DataService} from "../../services/data.service";
import {GenresService} from "../../services/genres.service";
import {Interfaces} from "../../common/interfaces";

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.page.html',
  styleUrls: ['./categorias.page.scss'],
})
export class CategoriasPage implements OnInit {

  categorias: genres[] = [];

  serie: Interfaces[] = [];
  pages = 0;

  opciones = {
    slidesPerView: 3,
    slidesOffsetBefore: 0,
    separator: 10,
  };

  constructor(private genresService: GenresService, private interfaceService: DataService) { }

  ngOnInit() {
    this.listSeries()
    this.listGenres()
  }

listGenres(): void{
    this.genresService.getGenresList().subscribe((data: any) => {
      this.categorias = data;
    });
}

  listSeries(): void{
    this.interfaceService.getSerieList().subscribe((data: any) => {
      this.serie = data;
    });
  }


  listSeriesByGenre(genre: genres): void{
    this.interfaceService.getSerieList().subscribe((data: any) => {
      this.serie = data.filter((serie: Interfaces) => serie.genres.includes(genre.name));
    });
  }

}

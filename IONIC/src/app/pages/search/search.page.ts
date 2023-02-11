import {Component, OnInit, ViewChild} from '@angular/core';
import {IonInfiniteScroll} from "@ionic/angular";
import {Interfaces} from "../../common/interfaces";
import {DataService} from "../../services/data.service";

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {

  serie: Interfaces[] = [];

  textoBuscar = '';
  textoBuscar2 = '';
  albumes: any[] = [];


  constructor(private serieService: DataService) { }

  ngOnInit() {
    this.listSeries()
  }

  private listSeries(): void{
    this.serieService.getSerieList().subscribe((data: any) => {
      this.serie = data;
    });
  }

  buscar(event: any) {
    this.textoBuscar = event.detail.value;
    this.textoBuscar2 = event.detail.value;
  }



}

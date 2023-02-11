import {Component, OnInit, ViewChild} from '@angular/core';
import {IonInfiniteScroll} from "@ionic/angular";
import {Interfaces} from "../../common/interfaces";
import {DataService} from "../../services/data.service";
import {genres} from "../../common/genres";

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {

  @ViewChild(IonInfiniteScroll, {static: false}) infiniteScroll! : IonInfiniteScroll;


  serie: Interfaces[] = [];


  pages = 0;

  constructor(private serieService: DataService) { }

  ngOnInit(): void {
    this.listSeries()
  }

  listSeries(): void{
    this.serieService.getSerieList().subscribe((data: any) => {
      this.serie = data;
      this.pages = data.length;
    });
  }

  loadData(event: any) {
    console.log('Cargando siguientes ...');
    setTimeout(() =>{
      if (this.serie.length >= this.pages) {
        event.target.complete();
        this.infiniteScroll.disabled = true;
        return;
      }
      const nuevoArr = Array(3);
      this.serie.push(...nuevoArr);
      event.target.complete();
    }, 1000 );
  }

}

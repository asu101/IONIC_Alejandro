import {Component, OnInit, ViewChild} from '@angular/core';
import {Interfaces} from "../../common/interfaces";
import {DataService} from "../../services/data.service";
import {ActivatedRoute, Router} from "@angular/router";
import {idCard} from "ionicons/icons";
import {IonModal, ToastController} from "@ionic/angular";

@Component({
  selector: 'app-detalles',
  templateUrl: './detalles.page.html',
  styleUrls: ['./detalles.page.scss'],
})
export class DetallesPage implements OnInit {

  @ViewChild(IonModal) modal!: IonModal;
  usuario: {nombre: string; email: string; puntuacion: number} =
    {
      nombre: '',
      email: '',
      puntuacion: 0
    };
  message = 'Abra el modal y rellene los datos';

  series: Interfaces = {
    _id: '',
    poster: [''],
    title: '',
    genres: [''],
    episodes: 0,
    year: 0,
    plot: '',
    imb: [{
      email: '',
      score: 0,
    }]
  };

  opciones = {
    slidesPerView: 1,
    slidesOffsetBefore: 0,
    separator: 7,

  };

  constructor(private dataService: DataService,
              private activatedRoute: ActivatedRoute,
              private toastController: ToastController) { }

  ngOnInit() {
    this.loadSerie();
  }

  private loadSerie() {
    const params = this.activatedRoute.snapshot.params;
    this.dataService.getSerie(params['id']).subscribe(
        res => {
          this.series = res;
          console.log(res);
        });
  }

  async presentToast(position: 'top' | 'middle' | 'bottom') {
    const toast = await this.toastController.create({
      message: 'Formulario enviado correctamente',
      duration: 1500,
      position: position
    });

    await toast.present();
  }

  cancel() {
    this.modal.dismiss(null, 'cancel');
  }

  onSubmitTemplate() {
    console.log('submit');
    this.modal.dismiss(this.usuario.nombre, 'confirm');
  }
  onWillDismiss(event: any) {
    if (event.detail.role === 'confirm') {
      this.series.imb.push({email: this.usuario.email, score: this.usuario.puntuacion})
      this.dataService.updateSerie(this.series._id, this.series).subscribe();
      this.usuario = {email: '', nombre: '', puntuacion: 0};
    }
  }

  puntuacionMedia(){
    let suma = 0;
    let media = 0;
    if (this.series.imb) {
      for (let i = 0; i < this.series.imb.length; i++) {
        suma = suma + this.series.imb[i].score;
      }
      media = suma / this.series.imb.length;
    }
    return media;
  }

}

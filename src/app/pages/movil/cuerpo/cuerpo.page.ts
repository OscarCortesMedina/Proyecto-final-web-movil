import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cuerpo',
  templateUrl: './cuerpo.page.html',
  styleUrls: ['./cuerpo.page.scss'],
})
export class CuerpoPage implements OnInit {

  cuerpo ='assets/images/Frente.jpg';
  constructor() { }

  ngOnInit() {
  }

  rotar() {
    if (this.cuerpo ==='assets/images/Frente.jpg'){
      this.cuerpo ='assets/images/Espalda.jpg';
    }else {
      this.cuerpo ='assets/images/Frente.jpg';
    }
  }

}

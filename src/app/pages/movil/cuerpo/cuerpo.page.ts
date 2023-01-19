import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-cuerpo',
  templateUrl: './cuerpo.page.html',
  styleUrls: ['./cuerpo.page.scss'],
})
export class CuerpoPage implements OnInit {

  cuerpo ='assets/images/frente.jpg';
  rotacion = 'frente';
  constructor(private modalCtrl: ModalController) {
   }

  ngOnInit() {
    this.test();
  }

  rotar() {
    if (this.cuerpo ==='assets/images/frente.jpg'){
      this.cuerpo ='assets/images/espalda.jpg';
    }else {
      this.cuerpo ='assets/images/frente.jpg';
    }
  }

  parteDelcuerpo(parte:string){
    this.cuerpo = 'assets/images/'+parte+'.png';
  }

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  escoger(parteDelCuepo:string) {

    return this.modalCtrl.dismiss(parteDelCuepo, 'escoger');
  }

  test(){
    let bright = 1;
    let time = 9;
    let text = `  - type: turn_on
    device_id: 90da2a67ed3ebf771bbc0d0b7f162774
    entity_id: light.led_strip
    domain: light
    brightness_pct: ${bright}
  - delay:
      hours: 0
      minutes: 0
      seconds: ${time}
      milliseconds: 0\n`
      let finalText = text;
      for (let i = 0;i<100;i++){
        bright++;
        finalText +=`  - type: turn_on
    device_id: 90da2a67ed3ebf771bbc0d0b7f162774
    entity_id: light.led_strip
    domain: light
    brightness_pct: ${bright}
  - delay:
      hours: 0
      minutes: 0
      seconds: ${time}
      milliseconds: 0\n`
      }
      console.log(finalText);
  } 



}

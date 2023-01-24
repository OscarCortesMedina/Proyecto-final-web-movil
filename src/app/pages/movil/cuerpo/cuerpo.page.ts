import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController, ModalController } from '@ionic/angular';
import { AppService } from 'src/app/config/app.service';
import { partesCuerpo } from 'src/app/interfaces/partes-cuerpo.interface';

@Component({
  selector: 'app-cuerpo',
  templateUrl: './cuerpo.page.html',
  styleUrls: ['./cuerpo.page.scss'],
})
export class CuerpoPage implements OnInit {

  cuerpo ='assets/images/frente.png';
  image ='';
  rotacion = 'frente';
  cuerpoForm: FormGroup;
  partes:any[] =[];
  parteSeleccionada:{
    id:number,
    nombre:string,
    tipo: number
  } ={
    id:0,
    nombre:'',
    tipo: 0
  };
  constructor(private modalCtrl: ModalController,
    private fb: FormBuilder,
    private app: AppService,
    private alertController: AlertController) {
    this.cuerpoForm = this.fb.group({
			parteCuerpo:  [null,[Validators.required]]})
      		
   }

  ngOnInit() {
    this.cuerpo=`assets/images/-${this.rotacion}.png`;    
  }

  rotar() {
    if (this.rotacion ==='frente'){
      this.rotacion = 'espalda';
      this.cuerpo =`assets/images/${this.image}-${this.rotacion}.png`;
    } else {
      this.rotacion = 'frente';
      this.cuerpo =`assets/images/${this.image}-${this.rotacion}.png`;
    }
  }

  parteDelcuerpo(parte:string){
    console.log('Parte escogida',parte);
    this.image=parte;
    let parteCuerpo:string='';
    let conversion = parte.split('-');

    if (conversion.length>1){
      parteCuerpo = conversion[0]+conversion[1][0].toUpperCase() 
      + conversion[1].substring(1);
    }else {
      parteCuerpo = conversion[0];
    }
    parteCuerpo+= this.rotacion === 'frente' ? 'Frente':'Espalda';

    this.partes = this.app?.partesCuerpo[parteCuerpo as keyof partesCuerpo];
    this.cuerpo = `assets/images/${parte}-${this.rotacion}.png`;
  }

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  async escoger() {
    if (this.cuerpoForm.invalid && this.image!==''){
			Object.keys(this.cuerpoForm.controls)
			.forEach(control=>{
				this.cuerpoForm.get(control)?.markAllAsTouched();
			}
			);
      
		}else if(this.image===''){
      const alert = await this.alertController.create({
        header: 'Escoger parte del cuerpo',
        message: 'Debe escoger una parte del cuerpo para continuar',
        buttons: ['Aceptar']
      });
      await alert.present();
    } else {
      this.modalCtrl.dismiss(this.cuerpoForm.value.parteCuerpo, 'escoger');
    }
  }

  get parteCuerpo(){
    return this.cuerpoForm.get('parteCuerpo');
  }

  get parteEspecifica(){
    return this.cuerpoForm.get('parteEspecifica');
  }

}

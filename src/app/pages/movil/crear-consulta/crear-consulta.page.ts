import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController, LoadingController, ModalController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AppService } from 'src/app/config/app.service';
import { CrearConsultaService } from './crear-consulta.service';
import { CuerpoPage } from '../cuerpo/cuerpo.page';

@Component({
  selector: 'app-crear-consulta',
  templateUrl: './crear-consulta.page.html',
  styleUrls: ['./crear-consulta.page.scss'],
})
export class CrearConsultaPage implements OnInit {

  consulta: FormGroup;

	constructor(
		private fb: FormBuilder,
		private alertController: AlertController,
		private router: Router,
		private loadingController: LoadingController,
		public app: AppService,
		private crearConsultaService:CrearConsultaService,
		private modalCtrl: ModalController
	) {
    this.consulta = this.fb.group({
		tipoLesion: [null, [Validators.required]],
		formaLesion: [null, [Validators.required]],
		numeroLesiones: [null, [Validators.required]],
		distribucion: [null, [Validators.required]],
		parteDelCuerpo: ['',[Validators.required]],
		parteDelCuerpoId: [null],
		evidencias:[]
		});
  }

	ngOnInit() {
		
	}

	async crearConsulta() {
		this.consulta.markAsDirty();

		Object.keys(this.consulta.controls)
		.forEach(control=>{
			this.consulta.get(control)?.markAllAsTouched();
		}
		)
		if(this.consulta.valid){
			await this.crearConsultaTipoDiagnostico();
		}
	}

	async crearConsultaTipoDiagnostico() {
		const alert = await this.alertController.create({
			header: 'Seleccione el tipo de diganóstico',
			buttons: ['Cancelar','Aceptar'],
			inputs: [
			  {
				label: 'Auto-generado',
				type: 'radio',
				value: 'auto',
			  },
			  {
				label: 'Medico',
				type: 'radio',
				value: 'med',
			  }
			],
		  });
		  
		  await alert.present();
		  const { data } = await alert.onDidDismiss();
		  console.log('Alert',data.values);
		  const loading = await this.loadingController.create();
			await loading.present();
			this.crearConsultaService.crearConulta(this.consulta.value)
			.subscribe(()=>{
				this.router.navigateByUrl('/inicio', { replaceUrl: true });
				loading.dismiss()});
	}

	async escogerParteDelCuerpo(){
		console.log("Escogiendo parte del cuerpo");
		const modal = await this.modalCtrl.create({
			component: CuerpoPage,
		  });
		  modal.present();
	  
		  const { data, role } = await modal.onWillDismiss();
	  
		  if (role === 'escoger') {
			console.log("Parte del cuerpo ",data);
			this.consulta.get('parteDelCuerpo')?.setValue(data.nombre)
			this.consulta.get('parteDelCuerpoId')?.setValue(data.id)
		  }

	}

	get tipoLesion() {
		return this.consulta.get('tipoLesion');
	}

	get formaLesion() {
		return this.consulta.get('formaLesion');
	}

	get numeroLesiones() {
		return this.consulta.get('numeroLesiones');
	}

	get distribucion() {
		return this.consulta.get('distribucion');
	}

	get parteDelCuerpo() {
		return this.consulta.get('parteDelCuerpo');
	}


}

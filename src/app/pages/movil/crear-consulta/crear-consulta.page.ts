import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController, LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AppService } from 'src/app/config/app.service';
import { CrearConsultaService } from './crear-consulta.service';

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
		private crearConsultaService:CrearConsultaService
	) {
    this.consulta = this.fb.group({
		tipoLesion: [null, [Validators.required]],
		formaLesion: [null, [Validators.required]],
		numeroLesiones: [null, [Validators.required]],
		distribucion: [null, [Validators.required]],
		parteDelCuerpo: ['',[Validators.required]],
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
			const loading = await this.loadingController.create();
			await loading.present();
			this.crearConsultaService.crearConulta(this.consulta.value)
			.subscribe(()=>loading.dismiss());
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

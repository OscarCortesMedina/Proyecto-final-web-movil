import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-registro-medico',
  templateUrl: './registro-medico.page.html',
  styleUrls: ['./registro-medico.page.scss'],
})
export class RegistroMedicoPage implements OnInit {

  registro: FormGroup;

	constructor(
		private fb: FormBuilder,
		private alertController: AlertController,
		private router: Router,
		private loadingController: LoadingController
	) {
    this.registro = this.fb.group({
			email: ['Test@test.com', [Validators.required, Validators.email]],
      nombre: ['Test test', [Validators.required, Validators.email]],
      nacionalidad: ['Bogotá', [Validators.required, Validators.email]],
      licenciaMedica: [false, [Validators.required, Validators.email]],
	    password: ['123456', [Validators.required, Validators.minLength(6)]],
      passwordConfirmation: ['123456', [Validators.required, Validators.minLength(6)]],
		});
  }

	ngOnInit() {
		
	}

	async registrarse() {
		const loading = await this.loadingController.create();
		//await loading.present();

	}


}
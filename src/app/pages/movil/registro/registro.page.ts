import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController, LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
import { RegistroService } from './registro.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {

  registro: FormGroup;
  perfilDermatologico:any = null;

	constructor(
		private fb: FormBuilder,
		private alertController: AlertController,
		private router: Router,
		private loadingController: LoadingController,
		private registroService:RegistroService
	) {
    this.registro = this.fb.group({
			email: ['', [Validators.required, Validators.email]],
      		nombre: ['', [Validators.required, Validators.minLength(4),Validators.maxLength(60)]],
      		edad: [null, [Validators.required, Validators.max(99),Validators.min(18)]],
      		residencia: ['', [Validators.required]],
      		perfilDematologico: [false, [Validators.requiredTrue]],
	  		password: ['', [Validators.required, Validators.minLength(6),Validators.maxLength(24)]],
      		passwordConfirmation: ['', [Validators.required, Validators.minLength(6),Validators.maxLength(24)]],
	  		terminosCondiciones: [false, [Validators.requiredTrue]]
		},
		{
		  validator: this.confirmedValidator('password', 'passwordConfirmation'),
		});
  }

	ngOnInit() {
	}

	async registrarse() {
		if (this.registro.invalid){
			Object.keys(this.registro.controls)
			.forEach(control=>{
				this.registro.get(control)?.markAllAsTouched();
			}
			);
			if (this.perfilDermatologico == null){
				const alert = await this.alertController.create({
					header: 'Registro',
					message: "Debe crear un perfil dermatológico para continuar.",
					buttons: ['Aceptar']
				});
				await alert.present();
			}
		} else {
		const loading = await this.loadingController.create();
		await loading.present();
		this.registroService.registro(this.registro.value).subscribe(
			async (res) => {
				await loading.dismiss();
				this.router.navigateByUrl('/login', { replaceUrl: true });
			},
			async (res) => {
				await loading.dismiss();
				const alert = await this.alertController.create({
					header: 'Registro fallido',
					message: res.error.error,
					buttons: ['Aceptar']
				});
				await alert.present();
			}
		);
		}

	}

	get email() {
		return this.registro.get('email');
	}

	get nombre() {
		return this.registro.get('nombre');
	}

	get edad() {
		return this.registro.get('edad');
	}

	get residencia() {
		return this.registro.get('residencia');
	}

	get perfilDematologico() {
		return this.registro.get('perfilDematologico');
	}

	get password() {
		return this.registro.get('password');
	}

	get passwordConfirmation() {
		return this.registro.get('passwordConfirmation');
	}

	get terminosCondiciones() {
		return this.registro.get('terminosCondiciones');
	}

	confirmedValidator(controlName: string, matchingControlName: string) {
		return (formGroup: FormGroup) => {
		  const control = formGroup.controls[controlName];
		  const matchingControl = formGroup.controls[matchingControlName];
		  if (
			matchingControl.errors &&
			!matchingControl.errors?.['confirmedValidator']
		  ) {
			return;
		  }
		  if (control.value !== matchingControl.value) {
			matchingControl.setErrors({ confirmedValidator: true });
		  } else {
			matchingControl.setErrors(null);
		  }
		};
	  }


}

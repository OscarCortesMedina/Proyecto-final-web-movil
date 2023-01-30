import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController, LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { AppService } from 'src/app/config/app.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage  {

  credentials: FormGroup;
  isPhone = false;
  registerPage ='';
	constructor(
		private fb: FormBuilder,
		private alertController: AlertController,
		private router: Router,
		private loadingController: LoadingController,
		private appService: AppService,
		private authService: AuthService
	) {
    this.credentials = this.fb.group({
			email: [null, [Validators.required, Validators.email]],
			password: [null, [Validators.required, Validators.minLength(6),Validators.maxLength(24)]]
		});
		this.isPhone=this.appService.isPhone;
		this.registerPage = this.isPhone ?'/registro': '/registro-medico'
  }


	async login() {
		if (this.credentials.invalid){
			Object.keys(this.credentials.controls)
			.forEach(control=>{
				this.credentials.get(control)?.markAllAsTouched();
			}
			);
      
		}else {
			const loading = await this.loadingController.create();
			await loading.present();
			this.authService.login(this.credentials.value).subscribe({
				next: async (res) => {
					await loading.dismiss();
					this.router.navigateByUrl('/inicio', { replaceUrl: true });
				},
				error:async (res) => {
					await loading.dismiss();
					const alert = await this.alertController.create({
						header: 'Login fallido',
						message: res.error.error,
						buttons: ['Aceptar']
					});
					await alert.present();
				}}
			);
		}
		
	}

	get email() {
		return this.credentials.get('email');
	}

	get password() {
		return this.credentials.get('password');
	}
}

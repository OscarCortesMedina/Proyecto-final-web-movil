import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { filter, Observable } from 'rxjs';
import { AppService } from './config/app.service';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit{
  public appPages = [
    { title: 'Inbox', url: '/folder/Inbox', icon: 'mail' },
    { title: 'Outbox', url: '/folder/Outbox', icon: 'paper-plane' },
    { title: 'Favorites', url: '/folder/Favorites', icon: 'heart' },
    { title: 'Archived', url: '/folder/Archived', icon: 'archive' },
    { title: 'Trash', url: '/folder/Trash', icon: 'trash' },
    { title: 'Spam', url: '/folder/Spam', icon: 'warning' },
  ];
  public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];
  private isPhone =false;
  private navEnd: Observable<NavigationEnd>;
  public showMenu = false;
  constructor(private alertController: AlertController, private appService:AppService,private router: Router) {
    this.isPhone=this.appService.isPhone;
    this.navEnd = this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ) as Observable<NavigationEnd>;
    this.loadSidemenu();
  }

  ngOnInit() {
    this.navEnd.subscribe(evt => {
      console.log(evt);
      this.showMenu= evt.url!=='/login';
    });
  }



  loadSidemenu (){
    if(this.isPhone){
      this.appPages = [
        { title: 'Inicio', url: '/inicio', icon: 'home' },
        { title: 'Consultas', url: '/folder/Outbox', icon: 'medkit' },
        { title: 'Notificaciones', url: '/folder/Outbox', icon: 'notifications' },
      ];
    }else {
      this.appPages = [
        { title: 'Inicio', url: '/inicio', icon: 'home' },
        { title: 'Casos Médicos', url: '/folder/Outbox', icon: 'clipboard' },
        { title: 'Reportes', url: '/folder/Outbox', icon: 'document' },
      ];

    }
  }

  changeLanguage() {
    this.alertController.create({
      header: 'Cambiar idioma',
      inputs: [
        {
          type: 'radio',
          label: 'Español',
          value: 'xs'
        },
        {
          type: 'radio',
          label: 'Inglés',
          value: 's'
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          handler: (data: any) => {
            console.log('Canceled', data);
          }
        },
        {
          text: 'Cambiar',
          handler: (data: any) => {
            console.log('Selected Information', data);
          }
        }
      ]
    }).then(res => {
      res.present();
    });
  }
}

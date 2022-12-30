import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-casos-medicos',
  templateUrl: './casos-medicos.page.html',
  styleUrls: ['./casos-medicos.page.scss'],
})
export class CasosMedicosPage implements OnInit {

  casos=[ {
    "name": "Will Smith",
    "descripcion": "descripcion"
},
{
    "name": "Jackline Joy",
    "descripcion": "descripcion"
},
{
    "name": "Alu Arjun",
    "descripcion": "descripcion"
},
{
    "name": "Kavitha Kumar",
    "descripcion": "descripcion"
},
{
    "name": "John Snow",
    "descripcion": "descripcion",
},
{
    "name": "Priya kanana",
    "descripcion": "descripcion"
},
{
    "name": "Shri Devi",
    "descripcion": "descripcion",
    "country": "descripcion"
},
{
    "name": "Richard Roy",
    "descripcion": "descripcion"
},
{
    "name": "Sonu Nigam",
    "descripcion": "descripcion",
},
{
    "name": "Priya Dutt",
    "descripcion": "descripcion",
}];
  constructor() { }

  ngOnInit() {
  }

}

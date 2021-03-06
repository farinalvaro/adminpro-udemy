import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-promesas',
  templateUrl: './promesas.component.html',
  styles: []
})
export class PromesasComponent implements OnInit {
  constructor() {
    this.contar3().then(
      mensaje => console.log('termino!', mensaje)
    ).catch(
      error => console.error('Error en la promesa', error)
    );
  }

  ngOnInit() {}

  contar3(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      let contador = 0;

      let intervalo = setInterval(() => {
        contador++;
        console.log(contador);
        if (contador === 3) {
          resolve(true);
          clearInterval(intervalo);
        }
      }, 1000);
    });

  }
}

import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState } from 'src/app/app.reducer';
import { IngresoEgreso } from '../ingreso-egreso.model';

@Component({
	selector: 'app-estadistica',
	templateUrl: './estadistica.component.html',
	styles: [
	]
})
export class EstadisticaComponent implements OnInit {
	ingresos: number;
	egresos: number;

	cuantosIngresos: number;
	cuantosEgresos: number;

	subscription: Subscription = new Subscription();

	public doughnutChartLabels: string[] = ['Ingreso', 'Egreso'];
	public doughnutChartData: number[] = [];

	constructor(
		private store: Store<AppState>
	) { }

	ngOnInit(): void {
		this.subscription = this.store.select('ingresoEgreso').subscribe(ingresoEgreso => {
			this.contarIngresoEgreso(ingresoEgreso.items);
		})
	}

	contarIngresoEgreso(items: IngresoEgreso[]) {
		this.ingresos = 0;
		this.egresos = 0;

		this.cuantosEgresos = 0;
		this.cuantosIngresos = 0;

		items.forEach(item => {
			if (item.type === 'ingreso') {
				this.cuantosIngresos++;
				this.ingresos += item.ammount;
			} else {
				this.cuantosEgresos++;
				this.egresos += item.ammount;
			}
		})

		this.doughnutChartData = [this.ingresos, this.egresos];
	}

}

import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { SetActionsActive } from '@ngrx/store-devtools/src/actions';
import { AngularFirestore } from 'angularfire2/firestore';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { AppState } from '../app.reducer';
import { AuthService } from '../auth/auth.service';
import { SetItemsActions, UnsetItemsActions } from './ingreso-egreso.actions';
import { IngresoEgreso } from './ingreso-egreso.model';

@Injectable({
	providedIn: 'root'
})
export class IngresoEgresoService {

	initListSubscription: Subscription = new Subscription();
	itemsSubscription: Subscription = new Subscription();

	constructor(
		private afDB: AngularFirestore,
		public authService: AuthService,
		private store: Store<AppState>
	) { }

	initIngresoEgresoListener() {
		this.initListSubscription = this.store.select('auth')
			.pipe(
				filter(auth => auth.user != null)
			)
			.subscribe(auth => {
				this.ingresoEgresoItems(auth.user.uid);
			})
	}

	private ingresoEgresoItems(uid: string) {
		this.itemsSubscription = this.afDB.collection(`${uid}/ingresos-egresos/items`)
			.snapshotChanges()
			.pipe(
				map(docData => {
					return docData.map(doc => {
						return {
							uid: doc.payload.doc.id,
							...doc.payload.doc.data() as object
						}
					})
				})
			)
			.subscribe((coleccion: any) => {
				this.store.dispatch(new SetItemsActions(coleccion));
			})
	}

	cancelarSubscriptions() {
		this.initListSubscription.unsubscribe();
		this.itemsSubscription.unsubscribe();
		this.store.dispatch(new UnsetItemsActions());
	}

	crearIngresoEgreso(ingresoEgreso: IngresoEgreso) {
		const user = this.authService.getUsuario();
		return this.afDB.doc(`${user.uid}/ingresos-egresos`).collection('items').add({ ...ingresoEgreso });
	}

	borrarIngresoEgreso(uid: string) {
		const user = this.authService.getUsuario();
		return this.afDB.doc(`${user.uid}/ingresos-egresos/items/${uid}`)
			.delete();
	}
}

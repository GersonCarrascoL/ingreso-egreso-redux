import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';

import Swal from 'sweetalert2';

import * as firebase from 'firebase';
import { map } from 'rxjs/operators';
import { User } from './user.model';
import { AngularFirestore } from 'angularfire2/firestore';
import { AppState } from '../app.reducer';
import { Store } from '@ngrx/store';
import { ActivarLoadingAction, DesactivarLoadingAction } from '../shared/ui.actions';
import { SetUserAction, UnsetUserAction } from './auth.action';
import { Subscription } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class AuthService {

	private userSubscription: Subscription = new Subscription();
	private usuario: User;

	constructor(
		private store: Store<AppState>,
		private afAuth: AngularFireAuth,
		private router: Router,
		private afDB: AngularFirestore
	) { }

	initAuthListener() {
		this.afAuth.authState.subscribe((fbUser: firebase.User) => {
			if (fbUser) {
				this.userSubscription = this.afDB.doc(`${fbUser.uid}/usuario`).valueChanges().subscribe((usuarioObj: any) => {
					const newUser = new User(usuarioObj);
					this.store.dispatch(new SetUserAction(newUser));
					this.usuario = newUser;
				})
			} else {
				this.usuario = null;
				this.userSubscription.unsubscribe();
			}
		})
	}

	crearUsuaio(nombre: string, email: string, password: string) {
		this.store.dispatch(new ActivarLoadingAction());
		this.afAuth.auth.createUserWithEmailAndPassword(email, password)
			.then(resp => {
				const user: User = {
					uid: resp.user.uid,
					nombre: nombre,
					email: resp.user.email
				};
				this.afDB.doc(`${user.uid}/usuario`)
					.set(user)
					.then(() => {
						this.store.dispatch(new DesactivarLoadingAction())
						this.router.navigate(['/']);
					});

			}).catch(error => {
				this.store.dispatch(new DesactivarLoadingAction());
				Swal.fire('Error en el registro', error.message, 'error');
			});
	}

	logIn(email: string, password: string) {
		this.store.dispatch(new ActivarLoadingAction());
		this.afAuth.auth.signInWithEmailAndPassword(email, password)
			.then(resp => {
				this.store.dispatch(new DesactivarLoadingAction());
				this.router.navigate(['/']);
			}).catch(error => {
				this.store.dispatch(new DesactivarLoadingAction());
				Swal.fire('Error en el login', error.message, 'error');
			});
	}

	logOut() {
		this.router.navigate(['/login']);
		this.afAuth.auth.signOut();

		this.store.dispatch(new UnsetUserAction());
	}

	isAuth() {
		return this.afAuth.authState.pipe(
			map(fbUser => {
				if (fbUser == null) {
					this.router.navigate(['/login'])
				}
				return fbUser != null;
			})
		)
	}

	getUsuario() {
		return { ... this.usuario };
	}
}

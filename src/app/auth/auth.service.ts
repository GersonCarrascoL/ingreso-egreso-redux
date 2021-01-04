import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';

import Swal from 'sweetalert2';

import * as firebase from 'firebase';
import { map } from 'rxjs/operators';
import { User } from './user.model';
import { AngularFirestore } from 'angularfire2/firestore';

@Injectable({
	providedIn: 'root'
})
export class AuthService {

	constructor(
		private afAuth: AngularFireAuth,
		private router: Router,
		private afDB: AngularFirestore
	) { }

	initAuthListener() {
		this.afAuth.authState.subscribe((fbUser: firebase.User) => {
			console.log(fbUser);
		})
	}

	crearUsuaio(nombre: string, email: string, password: string) {
		this.afAuth.auth.createUserWithEmailAndPassword(email, password)
			.then(resp => {
				const user: User = {
					uid: resp.user.uid,
					nombre: nombre,
					email: resp.user.email
				};
				console.log(user)
				this.afDB.doc(`${user.uid}/usuario`)
					.set(user)
					.then(() => {
						this.router.navigate(['/']);
					});

			}).catch(error => {
				Swal.fire('Error en el registro', error.message, 'error');
			});
	}

	logIn(email: string, password: string) {
		this.afAuth.auth.signInWithEmailAndPassword(email, password)
			.then(resp => {
				this.router.navigate(['/']);
			}).catch(error => {
				Swal.fire('Error en el login', error.message, 'error');
			});
	}

	logOut() {
		this.router.navigate(['/login']);
		this.afAuth.auth.signOut();
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
}

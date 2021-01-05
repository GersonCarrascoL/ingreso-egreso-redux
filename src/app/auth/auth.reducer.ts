import * as fromAuth from './auth.action';
import { User } from './user.model';

export interface AuthState {
	user: User;
}

const estadoInicial: AuthState = {
	user: null
}

export function AuthReducer(state = estadoInicial, action: fromAuth.SetUserAction): AuthState {
	switch (action.type) {
		case fromAuth.SET_USER:
			return {
				user: { ...action.user }
			}
		default:
			return state;
	}
}

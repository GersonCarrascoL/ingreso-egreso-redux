export class IngresoEgreso {
	description: string;
	ammount: number;
	type: string;
	uid?: string;

	constructor(obj: DataObj) {
		this.description = obj && obj.description || null;
		this.ammount = obj && obj.ammount || null;
		this.type = obj && obj.type || null;
		// this.uid = obj && obj.uid || null;
	}
}

interface DataObj {
	description: string;
	ammount: number;
	type: string;
	uid?: string;
}

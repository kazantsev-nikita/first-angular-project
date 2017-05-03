export class Cat {
	constructor(
    private username: string,
    private password: string,
    public id: number,
    public name: string,
    public isOnline: boolean,
    public birthDate?: Date,
    public photoUrl?: string,
    public interests?: Array<string>
	) { }
}
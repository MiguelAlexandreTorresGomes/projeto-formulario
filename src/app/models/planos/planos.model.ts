export class Planos {
    private _id: number;
    private _image: any;
    private _name: string;
    private _monthlyPrice: number;
    private _priceAnnual: number;

    constructor(id: number, image: any, name: string, monthlyPrice: number, priceAnnual: number) {
        this._id = id;
        this._image = image;
        this._name = name;
        this._monthlyPrice = monthlyPrice;
        this._priceAnnual = priceAnnual;
    }


    get id() {
        return this._id;
    }
    get image() {
        return this._image;
    }
    get name() {
        return this._name;
    }
    get monthlyPrice() {
        return this._monthlyPrice;
    }

    get priceAnnual(){
        return this._priceAnnual;
    }

    set image(value: any){
        this._image = value;
    }

    set name(value: string){
        this._name = value;
    }
    set monthlyPrice(value: number){
        this._monthlyPrice = value;
    }
    set priceAnnual(value: number){
        this._priceAnnual = value;
    }
}
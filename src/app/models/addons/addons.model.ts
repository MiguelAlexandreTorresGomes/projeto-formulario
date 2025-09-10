

export class Addons {
    private _id: number;
    private _name: string;
    private _info: string;
    private _monthlyPrice: number;
    private _priceAnnual: number;

    constructor(id: number, name: string, info: string, monthlyPrice: number, priceAnnual: number) {
        this._id = id;
        this._name = name;
        this._info = info;
        this._monthlyPrice = monthlyPrice;
        this._priceAnnual = priceAnnual;
    }


    get id() {
        return this._id;
    }
    get name() {
        return this._name;
    }
    get info() {
        return this._info;
    }
    get monthlyPrice() {
        return this._monthlyPrice;
    }

    get priceAnnual() {
        return this._priceAnnual;
    }

    set name(value: string) {
        this._name = value;
    }
    set info(value: any) {
        this._info = value;
    }
    set monthlyPrice(value: number) {
        this._monthlyPrice = value;
    }
    set priceAnnual(value: number) {
        this._priceAnnual = value;
    }
}
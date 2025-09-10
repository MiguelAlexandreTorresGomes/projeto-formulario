import { Planos } from "../planos/planos.model";
import { Addons } from "../addons/addons.model";

export class User {
  private _id: number;
  private _name: string;
  private _email: string;
  private _phoneNumber: string;
  private _planos: Planos | null;
  private _addons: Addons[];
  private _isAnnual: boolean;

  constructor(user?: Partial<User>) {
    this._id = user?.id ?? 0;
    this._name = user?.name ?? '';
    this._email = user?.email ?? '';
    this._phoneNumber = user?.phoneNumber ?? '';
    this._planos = user?.planos ?? null;
    this._addons = user?.addons ?? [];
    this._isAnnual = user?.isAnnual ?? false;
  }

  get id() { return this._id; }
  get name() { return this._name; }
  get email() { return this._email; }
  get phoneNumber() { return this._phoneNumber; }
  get planos() { return this._planos; }
  get addons() { return this._addons; }
  get isAnnual() { return this._isAnnual; }

  set name(value: string) {
    this._name = value;
  }
  set email(value: string) {
    this._email = value;
  }
  set phoneNumber(value: string) {
    this._phoneNumber = value;
  }
  set planos(value: Planos | null) {
    this._planos = value;
  }
  set addons(value: Addons[]) {
    this._addons = value;
  }
  set isAnnual(value: boolean) {
    this._isAnnual = value;
  }
}

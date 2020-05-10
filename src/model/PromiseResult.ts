export class PromiseResult {

    private _original: Promise<any>;
    private _resultData: any;
    private _errorData: any;    

    constructor(original: Promise<any>, resultData: any, errorData: any) {
        this._original = original;
        this._resultData = resultData;
        this._errorData = errorData;
    }

    public get original(): Promise<any> {
        return this._original;
    }

    public set original(value: Promise<any>) {
        this._original = value;
    }
    public get resultData(): any {
        return this._resultData;
    }
    public set resultData(value: any) {
        this._resultData = value;
    }
    public get errorData(): any {
        return this._errorData;
    }
    public set errorData(value: any) {
        this._errorData = value;
    }
}
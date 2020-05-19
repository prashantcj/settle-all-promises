export class PromiseResult {

    private _original: Promise<any>;
    private _resultData: any;
    private _errorData: any;    

    /**
     * 
     * @param original Promise which is executed
     * @param resultData Result object after promise successfully resolved
     * @param errorData Error object data after promise failed | rejected
     */
    constructor(original: Promise<any>, resultData: any, errorData: any) {
        this._original = original;
        this._resultData = resultData;
        this._errorData = errorData;
    }

    /**
     * Gets original Promise which got executed
     */
    public get original(): Promise<any> {
        return this._original;
    }

    /**
     * Sets original Promise which got executed
     */
    public set original(value: Promise<any>) {
        this._original = value;
    }

    /**
     * Gets result object after promise successfully resolved
     */
    public get resultData(): any {
        return this._resultData;
    }

    /**
     * Sets result object after promise successfully resolved
     */
    public set resultData(value: any) {
        this._resultData = value;
    }

    /**
     * Gets error object data after promise failed | rejected
     */
    public get errorData(): any {
        return this._errorData;
    }

    /**
     * Sets error object data after promise failed | rejected
     */
    public set errorData(value: any) {
        this._errorData = value;
    }

    /**
     * Return `true` if promise successfully resolved, `false`otherwise
     */
    public get isResolved(): boolean {
        if(this.resultData) return true;
        return false;
    }

    /**
     * Return `true` if promise failed | rejected, `false`otherwise
     */
    public get isRejected(): boolean {
        if(this.errorData) return true;
        return false;
    }
}
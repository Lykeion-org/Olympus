class AppState {

    private static _instance: AppState; 
    private _environment: Environment = $state(Environment.Development)

    private constructor(){
    }

    public static GetInstance(): AppState {
        if (!this._instance) {
            this._instance = new AppState();
        }
        return this._instance;
    }

    public get Environment() : Environment {
        return this._environment;
    }

}

enum Environment {
    Development,
    Production
}

export {AppState, Environment}
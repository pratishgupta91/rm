class StorageDataHandler {
    static saveData(data : any) {

    }

    static retrieveData(key : string, callback : (data : any) => void) : any {
        Api.retrieveLocalData(key, callback);
    }
}
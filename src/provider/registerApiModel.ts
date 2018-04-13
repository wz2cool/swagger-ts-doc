export function registerApiModel(apiModel: new () => any) {
    const register = new apiModel();
}

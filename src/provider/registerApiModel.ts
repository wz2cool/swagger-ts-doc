export function RegisterApiModel(apiModel: new () => any) {
    const register = new apiModel();
}

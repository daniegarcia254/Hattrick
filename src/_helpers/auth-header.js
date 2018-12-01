export function authHeader() {
    // return authorization header with jwt token
    let user = JSON.parse(localStorage.getItem('user'));

    if (user && user.id) {
        return { 'Authorization': user.id };
    } else {
        return {};
    }
}

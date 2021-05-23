export default async function isAutharised(){
    var response = await fetch("/api/auths/isAuthorised", {method : "POST"});
    if(response.ok)return response.json();
    else return null;
};

export async function logOut(){
    var response = await fetch("/api/auths/logOut", {method : "GET"});
    if(response.ok)return true;
    else return false;
}
import { User, GameProfile } from ".";

export interface TokenServer {
    grantAccessToken(user: User, clientToken: string): string
    genClientToken(user: User): string
    getProfileForToken(accessToken: string): string
}
export function grantAccessToken(user: User, clientToken: string): string {
    return ''
}
export function genClientToken(user: User): string {
    return ''
}
export function getProfileForToken(accessToken: string): string {
    return '';
}
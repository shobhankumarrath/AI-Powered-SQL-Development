import { jwtDecode } from "jwt-decode";

interface JwtPayload {
  exp: number;
}

export function isTokenExpired(token: string) {
  try {
    const decoded = jwtDecode<JwtPayload>(token);

    return decoded.exp * 1000 < Date.now();
  } catch {
    return true;
  }
}

export function logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  window.location.href = "/login";
}

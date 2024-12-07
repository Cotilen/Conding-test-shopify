import * as AuthService from "../services/AuthService.js";

export const authController = AuthService.authService;
export const refreshToken = AuthService.refreshToken
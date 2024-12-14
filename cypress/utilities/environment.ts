const env_creds = {
  admin_url: Cypress.env('passwordLoginUrl'),
  portal_url: Cypress.env('portalUrl'),
  auth_Url: Cypress.env('authPortalUrl'),
  username: Cypress.env('username'),
  password: Cypress.env('password'),
  login_creds: Cypress.env('loginData'),
  location_portal_url: Cypress.env('locationPortalURL'),
  smartCodeUrl: Cypress.env('smartCodeUrl'),
}
export default env_creds

import { CookieOptions } from "ngx-cookie-service";
import { environment } from "../../../../environments/environment";
export const cookieOptions : CookieOptions = {
  path: '/',
  domain: environment.domain,
  secure: true,
  sameSite: 'Strict'
}

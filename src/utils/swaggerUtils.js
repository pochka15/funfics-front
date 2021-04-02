import SwaggerClient from "swagger-client";
import ApiUrls from "../apiUrls";

export async function swaggerClientWithToken(token) {
  return SwaggerClient({
    url: ApiUrls.SWAGGER_PATH,
    authorizations: { Authorization: { value: `Bearer ${token}` } },
  });
}

export async function swaggerClient() {
  return SwaggerClient({
    url: ApiUrls.SWAGGER_PATH,
  });
}

import { Service } from "typedi";
import { Action } from "routing-controllers";

@Service()
export class AuthorizationChecker {
  private checkAuthorization(action: Action, roles: string[]): boolean {
    const user = action.request.user; // Assuming 'user' is attached to the request in your auth middleware
    if (!user) {
      return false; // No user means no authorization possible
    }

    return user.roles.some((role) => roles.includes(role)); // Check if any of the user's roles match the required roles
  }
}

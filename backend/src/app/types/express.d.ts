import { UserRole } from "../../generated/prisma/enums";
import { AuthUser } from "./user.type";

declare global {
	namespace Express {
		interface Request {
			user?: AuthUser;
		}
	}
}

export {};

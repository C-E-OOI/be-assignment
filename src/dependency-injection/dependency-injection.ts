import { AccountManagerRepository } from "@/AccountManager/infrastructure/repository/psql/account-manager.mysql";
import { prismaConnection } from "./dependency-injection.init";
import { AccountManagerService } from "@/AccountManager/domain/account-manager.service";
import { AccountManagerQuery } from "@/AccountManager/application/query/account-manager.query";
import { AccountManagerCommand } from "@/AccountManager/application/command/account-manager.command";

const getPrismaConnection = prismaConnection();

const repository = new AccountManagerRepository(getPrismaConnection);
const service = new AccountManagerService(repository);
export const query = new AccountManagerQuery(service);
export const command = new AccountManagerCommand(service);

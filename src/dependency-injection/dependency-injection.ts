import { EdtechMysqlRepository } from "@/core/infrastructure/repository/mysql/edtech.mysql";
import { prismaConnection } from "./dependency-injection.init";
import { EdtechService } from "@/core/domain/edtech.service";
import { EdtechQuery } from "@/core/application/query/edtech.query";
import { EdtechCommand } from "@/core/application/command/edtech.command";

const getPrismaConnection = prismaConnection();

const repository = new EdtechMysqlRepository(getPrismaConnection);
const service = new EdtechService(repository);
export const query = new EdtechQuery(service);
export const command = new EdtechCommand(service);

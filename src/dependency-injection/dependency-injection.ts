import { AccountManagerRepository } from "@/AccountManager/infrastructure/repository/psql/account-manager.mysql";
import { prismaConnection } from "./dependency-injection.init";
import { AccountManagerService } from "@/AccountManager/domain/account-manager.service";
import { AccountManagerQuery } from "@/AccountManager/application/query/account-manager.query";
import { AccountManagerCommand } from "@/AccountManager/application/command/account-manager.command";
import Elysia from "elysia";
import { AccountManagerEndpoint } from "@/AccountManager/endpoint/account-manager.endpoint";

class Application {
  private _repositoryUser;
  private _serviceUser;
  private _queryUser;
  private _commandUser;
  private _router;
  private _endpointUser;

  constructor() {
    this._repositoryUser = new AccountManagerRepository(prismaConnection());
    this._serviceUser = new AccountManagerService(this._repositoryUser);
    this._queryUser = new AccountManagerQuery(this._serviceUser);
    this._commandUser = new AccountManagerCommand(this._serviceUser);
    this._router = new Elysia({ prefix: "/auth" });
    this._endpointUser = new AccountManagerEndpoint(this._queryUser, this._commandUser, this._router);
  }

  get getEndpointUser() {
    return this._endpointUser;
  }
}

const App = new Application();
export const endpointsUser = App.getEndpointUser.registerRoute();

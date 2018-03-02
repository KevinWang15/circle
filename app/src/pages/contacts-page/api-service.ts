import {Injectable} from "@angular/core";
import {Api, RequiresLogin} from "../../services/singleton/api";

export interface UserInfoInterface {
  avatar_url: string,
  email: string,
  id: number,
  mobile: string,
  name: string,
}

export interface ResponseInterface extends Array<UserInfoInterface> {
}

@Injectable()
export class ApiService {
  constructor(public api: Api) {
  }

  @RequiresLogin
  getGroupMembers(groupId: number): Promise<ResponseInterface> {
    return this.api.request("group.members", {id: groupId}, {});
  };
}

export default ApiService;


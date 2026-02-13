import type { IUserInfo } from "./userInfo.type";

export interface IState {
    noticeCount: number;
    userInfo: IUserInfo;
    menuList: string[];
    actionList: []
}
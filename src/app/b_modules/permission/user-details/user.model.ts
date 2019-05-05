export class UserModel {
    private roleName: string = null;
    private roleKey: string = null;
    private departmentList: Array<{}> = [];
    private userList: Array<{}> = [];

    constructor() {
    }

    getDefaultUserModel() {
        return {
            department_list: this.departmentList,
            department_code: null,
            user_list: this.userList,
            user_role: null,
            category_code: null,
            company_code: null,
            is_active: true,
            is_allowed_visit: false,
            is_auth_sync: false,
            is_delete: false,
            is_grading_allowed: false,
            user_code: null,
            user_fullname: null,
            user_loginname: null,
            user_name: null,
            country_phone_code: null,
            phone_number: null,
            email: null,
            user_password: null,
            user_short_name: null
        };
    }

    getDefualtRole() {
        return {
            roleName: this.roleName,
            roleKey: this.roleKey
        };
    }

    getUserPayload(data) {
        delete data.department_list;
        delete data.user_list;
        return {
            category_code: data.category_code.category_code,
            company_code: data.company_code,
            department_code: data.department_code.department_code,
            is_active: true,
            is_allowed_visit: false,
            is_auth_sync: false,
            is_delete: false,
            is_grading_allowed: false,
            user_code: data.user_code,
            user_fullname: data.user_fullname,
            user_loginname: data.user_loginname,
            user_name: data.user_loginname,
            country_phone_code: data.country_phone_code,
            phone_number: data.phone_number,
            email: data.email,
            user_password: null,
            user_short_name: null
        };
    }

    setDepartmentList(departList) {
        this.departmentList = departList;
    }

    setUserList(usrLst) {
        this.userList = usrLst;
    }

    addUserList(data) {
        const list = { label: data.category_name, value: { category_code: data.category_code, category_key: data.category_key } };
        this.userList.push(list);
    }
}

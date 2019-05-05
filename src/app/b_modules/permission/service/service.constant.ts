import * as _ from 'lodash';

export const BUTTON_LABEL = {
    party_name: { label: 'Party Name', code: 'PN' },
    party_code: { label: 'Party Code', code: 'PC' },
    party_type: { label: 'Party Type', code: 'PT' },
    party_address: { label: 'Contact Details', code: 'CD' },
    contact_person_email: { label: 'Email', code: 'EM' }
};

export const getEncDecModifiedData = (data) => {
    return Object.keys(data).map((key) => {
        const field = BUTTON_LABEL[key];
        return {
            label: field.label,
            code: field.code,
            encrypted: data[key],
            [key]: data[key],
            has_checkbox: data[key]
        };
    });
};

export const ENCRYPTION_DECRYPTION_DATA = [
    { label: 'Party Code', code: 'PC', encrypted: false, party_code: false, has_checkbox: false },
    { label: 'Party Name', code: 'PN', encrypted: false, party_name: false, has_checkbox: false },
    { label: 'Party Type', code: 'PT', encrypted: false, party_type: false, has_checkbox: false },
    { label: 'Contact Details', code: 'CD', encrypted: false, party_address: false, has_checkbox: false },
    { label: 'E-mail ID', code: 'EM', encrypted: false, contact_person_email: true, has_checkbox: false }
];

export const POPUP_HEADER = {
    ROLE: 'Add New Role',
    USER: 'Add New User',
    ENC_DEC: 'Encryption / Decryption Edit'
};



export const ENC_DEC_LABEL = {
    true: 'Decrypted Data',
    false: 'Encrypted Data'
};

export const USER_TABLE_COLUMN = [
    { header: 'Organisation Hierarchy', field: 'name', class: 'colw300' },
    { header: 'Display Name', field: 'display_name', class: 'colw124' },
    { header: 'View Resource Permissions', field: 'resource', class: 'colw215' },
    { header: 'Encryption/Decryption', field: 'resource', class: '' }
];

export const generateDepartment = (data) => {
    data = _.orderBy(data, ['department_code'], ['asc']);
    const dropDownaList = [{ label: 'Select department', value: null}];
    for (const item of data) {
        const { department_name, department_code, department_key } = item;
        dropDownaList.push({
            label: department_name,
            value: { department_code, department_key }
        });
    }
    return dropDownaList;
};

export const generateRoleList = (data) => {
    data = _.orderBy(data, ['category_code'], ['asc']);
    const dropDownaList = [{ label: 'Select user role', value: null}];
    for (const item of data) {
        const {category_name, category_code, category_key } = item;
        dropDownaList.push({
            label: category_name,
            value: { category_code, category_key }
        });
    }
    return dropDownaList;
};


export const SRC_DEST = [{label: '---', value: null}, {label: 'Source', value: 'SRC'}, {label: 'Destination', value: 'DNS'}];

export const CLASS_CSS = {
    ORG: 'org-cls',
    CATEGORY: 'category-cls',
    DEPARTMENT: 'department-cls',
    USER: 'user-cls'
};

import { groupBy } from 'lodash';
import * as _ from 'underscore';

export const payloadForAddDeleteResource = (data, resourceParam) => {
  // const type = data[0].type;
  const optPayload = {
    org_name: resourceParam.org_id,
    role_name: resourceParam.role_id,
    user_code: resourceParam.user_id
  };
  const payload = {};
  const groupByDepart = groupBy(data, 'department_id');
  for (const k in groupByDepart) {
    if (k) {
      payload[k] = _.pluck(groupByDepart[k], 'resource_key');
      // const resourceObj = {
      //     ...optPayload,
      //     permissions: {
      //         additional: {},
      //         revoke: {}
      //     }
      // };
      // const grpItem = [];
      // for (const item of groupByDepart[k]) {
      // grpItem.push(item.payload_key);
      //     // resourceObj.permissions[type][resourceParam.dept_id] = grpItem;
      //     resourceObj.permissions[type][k] = grpItem;
      // }
      // payload.push(resourceObj);
    }
  }
  return payload;
};

export const changeResponse = (data, operation, action, routes) => {
  if (data && routes) {
    const dataKey = Object.keys(data);
    const filterData = [];
    for (const orgData of dataKey) {
      filterData.push(Object.assign({}, data[orgData], {
        is_disabled: false,
        payload_key: orgData,
        operation,
        type: action,
        user_department_id: routes.dept_id
      },

      ));
    }
    return filterData;
  }
};

export const convertObjectToArray = (obj) => {
  if (obj) {
    return Object.values(JSON.parse(JSON.stringify(obj)));
  }
};

export const DELETE_OPERATION_QUERY = {
  ASSIGNED: 'addToRevoke',
  REVOKED: 'removeFromRevoke'
};

export const ROLE_CONFIG = {
  'org-role': {
    viewPannels: [
      {
        key: 'assigned',
        header: 'Assigned Resource',
        data: [],
        collapsed: false,
        isLoading: false
      },
      {
        key: 'assignable',
        header: 'Assignable Resource',
        data: [],
        collapsed: true,
        isLoading: false
      },
    ],
    get: '/orgs/roles/permissions/',
    put: '/orgs/roles/permissions/',
    delete: '/orgs/roles/permissions/',
  },
  'dept-role': {
    viewPannels: [
      {
        key: 'assigned',
        header: 'Assigned Resource',
        data: [],
        collapsed: false,
        isLoading: false
      },
      {
        key: 'assignable',
        header: 'Assignable Resource',
        data: [],
        collapsed: true,
        isLoading: false
      },
    ],
    get: '/orgs/departments/roles/permissions/',
    put: '/orgs/departments/roles/permissions/',
    delete: '/orgs/departments/roles/permissions/',
  },
  'user-role': {
    viewPannels: [
      {
        key: 'assigned',
        header: 'Assigned Resource',
        data: [],
        collapsed: false,
        isLoading: false
      },
      {
        key: 'assignable',
        header: 'Assignable Resource',
        data: [],
        collapsed: true,
        isLoading: false
      },
      {
        key: 'revoked',
        header: 'Revoked Resource',
        data: [],
        collapsed: true,
        isLoading: false
      }
    ],
    get: '/users/permissions/',
    put: '/users/permissions/',
    delete: '/users/permissions/',
  }
};

export const DISPLAY_TAB_NAME = (val) => {
  return Object.values(JSON.parse(JSON.stringify(val))).join().replace(/,/g, ' / ');
};



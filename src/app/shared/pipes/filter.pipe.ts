import { Pipe, PipeTransform, Injectable } from '@angular/core';
import * as _ from 'lodash';
@Pipe({
    name: 'filter',
    pure: false
})
@Injectable()
export class SearchPipe implements PipeTransform {

    /**
     * @param items object from array
     * @param term term's search
     */
    transform(items: any, term: string): any {
        if (!term || !items) {
            return items;
        }
        items = items.data || items;
        return SearchPipe.filter(items, term);
    }

    /**
     *
     * @param items List of items to filter
     * @param term  a string term to compare with every property of the list
     *
     */
    // tslint:disable-next-line:member-ordering
    static filter(items: Array<{ [key: string]: any }>, term: string): Array<{ [key: string]: any }> {

        const toCompare = term.toLowerCase();
        return items.filter((item: any) => {
            // tslint:disable-next-line:prefer-const
            for (let property in item) {
                if (item[property] === null) {
                    continue;
                }
                if (item[property].toString().toLowerCase().includes(toCompare)) {
                    return true;
                }
                if (_.isObject(item[property])) {
                    if (!_.isEmpty(item[property])) {
                        // tslint:disable-next-line:prefer-const
                        for (let data in item[property]) {
                            if (item[property][data] === null) {
                                continue;
                            }
                            if (item[property][data] && item[property][data].toString().toLowerCase().includes(toCompare)) {
                                return true;
                            }
                            if (_.isObject(item[property][data])) {
                                if (!_.isEmpty(item[property][data])) {
                                    // tslint:disable-next-line:prefer-const
                                    for (let obj in item[property][data]) {
                                        if (item[property][data][obj] === null) {
                                            continue;
                                        }
                                        if (
                                            item[property][data][obj] &&
                                            item[property][data][obj].toString().toLowerCase().includes(toCompare)
                                        ) {
                                            return true;
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
            return false;
        });
    }
}

import { Query } from "mongoose";

type QueryString = {
    page?: number;
    sort?: string;
    limit?: number;
    fields?: string;
};

export class APIFeature<T extends Document> {
    public query: Query<T[], any>;
    public queryString: QueryString;

    constructor(query: Query<T[], any>, queryString: QueryString) {
        this.query = query;
        this.queryString = queryString;
    }

    filter() {
        const queryObj = { ...this.queryString };
        const excludedFields: (keyof QueryString)[] = ['page', 'sort', 'limit', 'fields'];
        excludedFields.forEach(ex => delete queryObj[ex]);
        let queryStr = JSON.stringify(queryObj);
        queryStr = queryStr.replace(/\b(getgt|lte|lt)\b/g, match => `$${match}`)

        this.query = this.query.find(JSON.parse(queryStr));
        return this;
    }

    sort() {
        if (this.queryString.sort) {
            this.query = this.query.sort(this.queryString.sort);
        }
        // default
        else {
            this.query = this.query.sort('-createdDate');
        }
        return this;
    }
    paginate() {
        const page = this.queryString.page as unknown as number || 1;
        const limit = this.queryString.limit as unknown as number || 10;
        const skip = (page - 1) * limit;

        this.query = this.query.skip(skip).limit(limit);
        return this;
    }
}

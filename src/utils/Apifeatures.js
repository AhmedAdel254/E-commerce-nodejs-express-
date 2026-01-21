class Apifeatures {
    constructor(mongooseQuery, queryString) {
        this.mongooseQuery = mongooseQuery; // ye3ni el model
        this.queryString = queryString; // ye3ni el req.query
    }
    pagination() {
        let page =this.queryString.page * 1 || 1;
        if (page <= 0) page = 1;
        let limit = 5;
        let skip = (page - 1) * limit;
        this.mongooseQuery.skip(skip).limit(limit);
        this.page = page;
        return this;
    }
    filter(){
        let filter = { ...this.queryString};
        let excludeFields = ["page", "sort", "limit", "fields","keyword"];
        excludeFields.forEach((el) => delete filter[el]);
        let filterString = JSON.stringify(filter);
        filterString = filterString.replace(
      /\b(gte|gt|lte|lt)\b/g, 
      (match) => `$${match}`
    );
        filter = JSON.parse(filterString);
        this.mongooseQuery.find(filter)
        return this;
    }
    
    sort(){
        if (this.queryString.sort) {
        let sortedBy = this.queryString.sort.replace(",", " ");
        this.mongooseQuery.sort(sortedBy);
    }
        return this;}
    
    search(){
         if (this.queryString.keyword) {
      let keyword = this.queryString.keyword;
        this.mongooseQuery.find({
        $or : [
          { name: { $regex: keyword, $options: "i" } },
          { description: { $regex: keyword, $options: "i" } },
        ],
    });
    }
    return this;
    }
    fields(){
         if (this.queryString.fields) {
      let fields = this.queryString.fields.replace(",", " ");
        this.mongooseQuery.select(fields);
    }
    return this;
    }
}

module.exports = Apifeatures;
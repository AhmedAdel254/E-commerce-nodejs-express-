

module.exports.routes=(app)=>{
    app.use('/api/v1/categories',require('../componants/category/category.api'))
    app.use('/api/v1/subCategories',require('../componants/subcategory/subCategory.api'))
    app.use('/api/v1/brands',require('../componants/brands/brands.api'))
    app.use('/api/v1/products',require('../componants/product/product.api'))
    app.use('/api/v1/users',require('../componants/user/user.api'))
    app.use('/api/v1/review',require('../componants/review/review.api'))
    app.use('/api/v1/wishList',require('../componants/wishList/wishList.api'))
    app.use('/api/v1/addresses',require('../componants/addresses/address.api'))
    app.use('/api/v1/copoun',require('../componants/copoun/copoun.api'))
    app.use('/api/v1/cart',require('../componants/cart/cart.api'))
    app.use('/api/v1/order',require('../componants/order/order.api'))
       
}
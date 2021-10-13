export const priceFilter = (arr, priceFilters) => {
    
    const {min,max} = priceFilters;
    if(!min && !max) return arr;
    
    return arr.filter(product=>product.price>=min && product.price <= max);
};
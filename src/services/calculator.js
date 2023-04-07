const calPrice = (product, index) => {
    if (Object.keys(product.Discount).length) {
        let len = parseInt(product.Discount.discount.toString().trim().length);
        if (product.Discount.discount.toString().trim().substr(len - 1, 1) === "%") {
            return parseFloat(product.Colors[index].price - product.Colors[index].price * parseFloat(product.Discount.discount.toString().trim().replace("%", "")) / 100).toFixed(0);
        } else {
            return parseFloat(product.Colors[index].price - parseFloat(product.Discount.discount)).toFixed(0);
        }
    }
    return parseFloat(product.Colors[index].price).toFixed(0);
}
export const displayPrice = (product, index) => {
    try {
        let price = calPrice(product, index);
        if (Object.keys(product.Discount).length) {
            return (
                <h4>
                    {new Intl.NumberFormat('vi', { style: 'currency', currency: 'VND' }).format(price)}
                    <del>
                        <span className="money">
                            {new Intl.NumberFormat('vi', { style: 'currency', currency: 'VND' }).format(product.price)}
                        </span>
                    </del>
                </h4>
            );
        }
        return (
            <h4>
                {new Intl.NumberFormat('vi', { style: 'currency', currency: 'VND' }).format(price)}
            </h4>
        )
    } catch (error) {
        console.log(error);
    }

};

const calPrice2 = (product, index) => {
    try {
        if (Object.keys(product.Discount).length) {
            let len = parseInt(product.Discount.discount.toString().trim().length);
            if (product.Discount.discount.toString().trim().substr(len - 1, 1) === "%") {
                return parseFloat(product.Colors[index].price - product.Colors[index].price * parseFloat(product.Discount.discount.toString().trim().replace("%", "")) / 100).toFixed(0);
            } else {
                return parseFloat(product.Colors[index].price - parseFloat(product.Discount.discount)).toFixed(0);
            }
        }
        return parseFloat(product.Colors[index].price).toFixed(0);
    } catch (error) {
        console.log(error);
    }
}
export const displayPrice2 = (product, index) => {
    let price = calPrice2(product, index);
    return (
        <h4>
            {new Intl.NumberFormat('vi', { style: 'currency', currency: 'VND' }).format(price)}
        </h4>
    )
};
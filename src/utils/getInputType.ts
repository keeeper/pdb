const getInputType = (name: string) => {
    let type;
    switch(name) {
        case 'amount_multiplier':
        case 'brand':
        case 'categ_id':
        case 'category_id':
        case 'code':
        case 'description':
        case 'gross_weight':
        case 'id':
        case 'net_weight':
        case 'packaging':
        case 'trade_item_unit_descriptor':
        case 'trade_item_descriptor':
        case 'trade_item_unit_descriptor_name':
        case 'type':
        case 'unit_name':
        case 'validation_status':
        case 'related_products':
            type = 'text';
            break;
        case 'edeka_article_number':
        case 'notes':
        case 'requires_best_before_date':
        case 'requires_meat_info':
            type = 'select';
            break;
        case 'best_before_date':
            type = 'date'
            break;
        default:
            type = 'text'
    }
    return type;
}

export default getInputType;
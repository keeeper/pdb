export type Product = {
    code: string | number;
    id?: string | number;
    amount_multiplier?: string | number;
    brand?: string | number;
    categ_id?: string | number;
    category_id?: string | number;
    description?: string | number;
    edeka_article_number?: boolean | string;
    gross_weight?: string | number;
    net_weight?: string | number;
    notes?: boolean | string;
    packaging?: string | number;
    related_products?: [] | {};
    requires_best_before_date?: boolean | string | undefined;
    requires_meat_info?: boolean | string;
    trade_item_unit_descriptor_name?: string | number;
    type?: string | number;
    unit_name?: string | number;
    validation_status?: string;
    best_before_date?: string;
    trade_item_descriptor?: string;
    trade_item_unit_descriptor?: string;
}

export type FormDataProps = {
    formData: Product
}

export type FormElementProps = {
    label: string;
    type?: string;
    name: string;
    value: any;
    onChangeHandler: (e:any) => void;
    isDisabled?: boolean | undefined;
    isRequired?: boolean | undefined;
}

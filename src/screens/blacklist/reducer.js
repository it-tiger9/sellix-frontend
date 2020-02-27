import { PRODUCT } from 'constants/types'

const initState = {
  product_list: [],
  product_vat_list: [],
  product_ware_house: [],
  product_parent: []
}

const ProductReducer = (state = initState, action) => {
  const { type, payload} = action
  
  switch(type) {

    case PRODUCT.PRODUCT_LIST:
      return {
        ...state,
        product_list: Object.assign([], payload.data)
      }

    case PRODUCT.PRODUCT_VAT_CATEGORY:
      const vat_list = payload.data.map(vat => {
        return {label: vat.name, value: vat.id}
      })

      return {
        ...state,
        product_vat_list: Object.assign([], vat_list)
      }

    case PRODUCT.PRODUCT_WHARE_HOUSE:
      const warehouse_list = payload.data.map(warehouse => {
        return {label: warehouse.warehouseName, value: warehouse.warehouseId}
      })

      return {
        ...state,
        product_ware_house: Object.assign([], warehouse_list)
      }


    case PRODUCT.PRODUCT_PARENT:
      return {
        ...state,
        product_parent: Object.assign([], payload.data)
      }

    default:
      return state
  }
}

export default ProductReducer
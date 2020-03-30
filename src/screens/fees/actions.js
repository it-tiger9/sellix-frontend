import { PRODUCT } from 'constants/types'
import {
  api
} from 'utils'


// Get Fees
export const getFees = () => {
    let data = {
        method: 'GET',
        url: '/fees'
    }

    return api(data).then(res => {
        if(res.status == 200)
            return res
        else throw res
    }).catch(err => {
        throw err
    })
}

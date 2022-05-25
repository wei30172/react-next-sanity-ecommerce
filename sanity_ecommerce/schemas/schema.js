import createSchema from 'part:@sanity/base/schema-creator'
import schemaTypes from 'all:part:@sanity/base/schema-type'

import banner from './banner';
import product from './product';
import user from './user';
import order from './order';
import orderItem from './orderItem';
import shippingAddress from './shippingAddress';
import paymentResult from './paymentResult';

export default createSchema({
  name: 'default',
  types: schemaTypes.concat([
    banner, product, user, order, orderItem, shippingAddress, paymentResult
  ]),
})


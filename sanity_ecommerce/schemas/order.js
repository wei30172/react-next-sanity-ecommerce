export default {
  name: 'order',
  title: 'Order',
  type: 'document',
  fields: [
    {
      name: 'user',
      title: 'User',
      type: 'reference',
      to: [{ type: 'user' }],
      options: {
        disableNew: true,
      },
    },
    {
      name: 'userName',
      title: 'UserName',
      type: 'string',
    },
    {
      name: 'orderItems',
      title: 'OrderItems',
      type: 'array',
      of: [{ type: 'orderItem'}],
    },
    {
      name: 'shippingAddress',
      title: 'ShippingAddress',
      type: 'shippingAddress',
    },
    {
      name: 'paymentMethod',
      title: 'paymentMethod',
      type: 'string',
    },
    {
      name: 'paymentResult',
      title: 'PaymentResult',
      type: 'paymentResult',
    },    
    {
      name: 'shippingPrice',
      title: 'ShippingPrice',
      type: 'number',
    },
    {
      name: 'taxPrice',
      title: 'TaxPrice',
      type: 'number',
    },
    {
      name: 'itemsPrice',
      title: 'ItemsPrice',
      type: 'number',
    },
    {
      name: 'orderTotalPrice',
      title: 'OrderTotalPrice',
      type: 'number',
    },
    {
      name: 'isPaid',
      title: 'IsPaid',
      type: 'boolean',
    },
    {
      name: 'paidAt',
      title: 'PaidAt',
      type: 'datetime',
    },
    {
      name: 'isDelivered',
      title: 'IsDelivered',
      type: 'boolean',
    },
    {
      name: 'deliveredAt',
      title: 'DeliveredAt',
      type: 'datetime',
    },
    {
      name: 'createdAt',
      title: 'CreatedAt',
      type: 'datetime',
    },
  ],
};
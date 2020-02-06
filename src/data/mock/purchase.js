const PRE_ORDER = [
  {
    id: 'PO0001012020',
    date: 'now',
    supplier: {
      id: '',
      name: 'Pro PET',
      address: '',
      distict: 'อ.เมือง',
      province: 'จ.สิงบุรี',
      tel: '00000',
    },
    itemList: [
      {
        name: 'พรีฟอร์ม 17g/ฟ้า/30mm',
        unitPrice: 0.85,
        unit: 'ชิ้น',
        amount: 100000,
        total: 85000,
      },
      {
        name: 'ฝา PET ฟ้า/30mm/ยาว',
        unitPrice: 0.18,
        unit: 'ชิ้น',
        amount: 100000,
        total: 18000,
      },
    ],
    beforeVAT: 103000,
    VAT: 7210,
    billTotal: 110210,
  },
];
const GOOD_RECIEVE = [
  {
    id: 'RC0001012020',
    ref: [{ PO: 'PO0001012020' }],
    date: 'now',
    dueDate: '30 วัน',
    status: 'pending', // pending,inprocess,paid
    supplier: {
      id: '',
      name: 'Pro PET',
      address: '',
      distict: 'อ.เมือง',
      province: 'จ.สิงบุรี',
      tel: '00000',
    },
    itemList: [
      {
        name: 'พรีฟอร์ม 17g/ฟ้า/30mm',
        unitPrice: 0.85,
        unit: 'ชิ้น',
        amount: 100000,
        total: 85000,
      },
      {
        name: 'ฝา PET ฟ้า/30mm/ยาว',
        unitPrice: 0.18,
        unit: 'ชิ้น',
        amount: 100000,
        total: 18000,
      },
    ],
    beforeVAT: 103000,
    VAT: 7210,
    billTotal: 110210,
  },
];

const PAYMENT_VOUCHER = [
  {
    id: 'PV0001012020',
    ref: [{ RC: 'RC0001012020', billTotal: 110210 }],
    discount: 0,
    paid: [
      { 1: 50000, date: 'now', method: 'โอนบัญชี', ref: '' },
      { 2: 60210, date: 'now+1', method: 'โอน', ref: '' },
    ],
    paidTotal: 110210,
  },
];

export { PRE_ORDER, GOOD_RECIEVE, PAYMENT_VOUCHER };

const QUATATION = [
    {
        id="QU0001012020",
        date:"now",
        to:{
            customerID:"00000",
            customerName:"น้ำดื่มพรทิพย์",
            address:"บ้านหลุม",
            district:"อ.เมือง",
            province:"จ.สุโขทัย",
            zipcode:64000
        },
        itemList:[
            {
                itemID:"PR0001",
                itemName:"ขวด PET 800cc/17g/30mm",
                amount:8500,
                unit:"ใบ",
                unitPrice:1.65,
                total:14025
            },
            {
                itemID:"PR0002",
                itemName:"ฝา PET น้ำเงิน/30mm/ยาว",
                amount:8500,
                unit:"ชิ้น",
                unitPrice:0.20,
                total:1700
            },
        ],
        billTotal:15725
    },
];

const INVOICE = [
    {
        id="IN0001012020",
        date:"now",
        dueDate:"",
        refQO:"QU0001012020",
        status:"paid/pending/inprocess",
        customer:{
            customerID:"00000",
            customerName:"น้ำดื่มพรทิพย์",
            address:"บ้านหลุม",
            district:"อ.เมือง",
            province:"จ.สุโขทัย",
            zipcode:64000
        },
        itemList:[
            {
                itemID:"PR0001",
                itemName:"ขวด PET 800cc/17g/30mm",
                amount:8500,
                unit:"ใบ",
                unitPrice:1.65,
                total:14025
            },
            {
                itemID:"PR0002",
                itemName:"ฝา PET น้ำเงิน/30mm/ยาว",
                amount:8500,
                unit:"ชิ้น",
                unitPrice:0.20,
                total:1700
            },
        ],
        discount:0,
        billTotal:15725
    },
];

const RECEIPT = [{
    id: 'RE0001012020',
    ref: [{ invoice: 'IN0001012020',customerID:"",customerName:"", billTotal: 15725 }],
    discount: 0,
    paid: [
    { 1: 10000, date: 'now', method: 'โอนบัญชี', ref: '' },
    { 2: 5725, date: 'now+1', method: 'โอน', ref: '' },
    ],
    paidTotal: 15725,
},
];


export {
    QUATATION,
    INVOICE,
    RECEIPT
}
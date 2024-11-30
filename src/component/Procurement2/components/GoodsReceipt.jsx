import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ItemRow from '../components/ItemRow';
import FormInput from '../components/FormInput';
import './GoodsReceipt.css';

const GoodsReceipt = () => {
    const [vendorBillDate, setVendorBillDate] = useState('');
    const [goodsReceiptDate, setGoodsReceiptDate] = useState('');
    const [vendorName, setVendorName] = useState('');
    const [billNo, setBillNo] = useState('');
    const [paymentMode, setPaymentMode] = useState('Credit');
    const [creditPeriod, setCreditPeriod] = useState(0);
    const [checkedBy, setCheckedBy] = useState('');
    const [subTotal, setSubTotal] = useState(0);
    const [ccCharge, setCcCharge] = useState(0);
    const [discountAmount, setDiscountAmount] = useState(0);
    const [vat, setVat] = useState(0);
    const [otherCharges, setOtherCharges] = useState(0);
    const [totalAmount, setTotalAmount] = useState(0);
    const [remarks, setRemarks] = useState('');
    const [items, setItems] = useState([
        {
            category: '',
            itemName: '',
            batchNo: '',
            expiryDate: '',
            quantity: 0,
            freeQuantity: 0,
            rate: 0,
            discountPercentage: 0,
            vatPercentage: 0,
            ccChargePercentage: 0,
            otherCharge: 0,
            totalAmount: 0,
            remarks: ''
        }
    ]);

    useEffect(() => {
        const calcSubTotal = items.reduce((acc, item) => acc + (item.rate * item.quantity), 0);
        setSubTotal(calcSubTotal);
    }, [items]);

    useEffect(() => {
        const total = subTotal + ccCharge + vat + otherCharges - discountAmount;
        setTotalAmount(total);
    }, [subTotal, ccCharge, discountAmount, vat, otherCharges]);

    const handleAddItem = () => {
        setItems([
            ...items,
            {
                category: '',
                itemName: '',
                batchNo: '',
                expiryDate: '',
                quantity: 0,
                freeQuantity: 0,
                rate: 0,
                discountPercentage: 0,
                vatPercentage: 0,
                ccChargePercentage: 0,
                otherCharge: 0,
                totalAmount: 0,
                remarks: ''
            }
        ]);
    };

    const handleItemChange = (index, field, value) => {
        const newItems = [...items];
        newItems[index][field] = value;
        setItems(newItems);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!vendorName || !billNo || !items.length) {
            alert('Please fill out all required fields.');
            return;
        }

        const data = {
            vendorBillDate,
            goodsReceiptDate,
            vendorName,
            billNo,
            paymentMode,
            creditPeriod,
            checkedBy,
            subTotal,
            ccCharge,
            discountAmount,
            vat,
            otherCharges,
            totalAmount,
            remarks,
            items
        };

        try {
            await axios.post('http://localhost:8080/api/goods-receipts', data);
            alert('Goods Receipt saved successfully!');
        } catch (error) {
            console.error('Error saving goods receipt:', error);
            alert('Failed to save goods receipt.');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="GoodsReceiptSettings-container">
            <h2>Add Goods Receipt</h2>

            <div className="GoodsReceiptSettings-form-row">
                <FormInput label="Vendor Bill Date:" type="date" value={vendorBillDate} setValue={setVendorBillDate} />
                <FormInput label="Goods Receipt Date:" type="date" value={goodsReceiptDate} setValue={setGoodsReceiptDate} />
                <FormInput label="Vendor Name:" type="text" value={vendorName} setValue={setVendorName} placeholder="Search Vendor Name" required />
            </div>

            <div className="GoodsReceiptSettings-form-row">
                <FormInput label="Bill No:" type="text" value={billNo} setValue={setBillNo} required />
                <FormInput label="Payment Mode:" type="select" value={paymentMode} setValue={setPaymentMode} options={['Credit', 'Cash']} />
                <FormInput label="Credit Period:" type="number" value={creditPeriod} setValue={setCreditPeriod} />
            </div>

            <div className="GoodsReceiptSettings-form-row">
                <FormInput label="Checked By:" type="text" value={checkedBy} setValue={setCheckedBy} />
            </div>

            <div className="GoodsReceiptSettings-items-container">
                <h3>Items</h3>
                {items.map((item, index) => (
                    <ItemRow key={index} item={item} index={index} handleItemChange={handleItemChange} />
                ))}
                <button type="button" onClick={handleAddItem} className="GoodsReceiptSettings-add-item-button">
                    Add New Row
                </button>
            </div>

            <div className="GoodsReceiptSettings-form-row">
                <FormInput label="SubTotal:" type="number" value={subTotal} setValue={setSubTotal} readOnly />
                <FormInput label="CC Charge:" type="number" value={ccCharge} setValue={setCcCharge} />
                <FormInput label="Discount Amount:" type="number" value={discountAmount} setValue={setDiscountAmount} />
            </div>

            <div className="GoodsReceiptSettings-form-row">
                <FormInput label="VAT:" type="number" value={vat} setValue={setVat} />
                <FormInput label="Other Charges:" type="number" value={otherCharges} setValue={setOtherCharges} />
                <FormInput label="Total Amount:" type="number" value={totalAmount} setValue={setTotalAmount} readOnly />
            </div>

            <div className="GoodsReceiptSettings-form-group">
                <button type="submit" className="GoodsReceiptSettings-btn-submit">Submit Receipt</button>
                <button type="button" className="GoodsReceiptSettings-btn-discard" onClick={() => alert('Changes Discarded!')}>Discard Changes</button>
            </div>
        </form>
    );
};

export default GoodsReceipt;

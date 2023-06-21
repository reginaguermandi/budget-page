import React, { useState } from 'react';
import fixedProducts from '../../fixedProducts';
import flexibleProducts from '../../flexibleProducts';

export default function Products() {
    const [quantities, setQuantities] = useState({});
    const [discount, setDiscount] = useState(0);
    const [totalDiscount, setTotalDiscount] = useState(0);
    const [parcelValue, setParcelValue] = useState(0);

    const handleQuantityChange = (productName, quantity) => {
        setQuantities((prevQuantity) => ({
            ...prevQuantity,
            [productName]: quantity,
        }));
    };

    const handleDiscountChange = (event) => {
        const newDiscount = parseFloat(event.target.value);

        if (!isNaN(newDiscount) && newDiscount >= 0 && newDiscount <= 100) {
            setDiscount(newDiscount);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Logic to add the values with the selected quantities and apply the discount
        let total = 0;
        for (const product of flexibleProducts) {
            const quantity = quantities[product.name] || 0;
            total += product.value * quantity;
        }
        const decimalDiscount = parseFloat(discount) / 100;
        const discountValue = total * decimalDiscount;
        const totalDiscount = total - discountValue;

        // Logic to calculate the value of the installments
        const parcelValue = (totalDiscount / 3).toFixed(2);

        setTotalDiscount(totalDiscount);
        setParcelValue(parcelValue);
    };

    const handleReset = () => {
        setQuantities({});
        setDiscount(0);
        setTotalDiscount(0);
        setParcelValue(0);
    };

    return (
        <div>
            <h2 className='my-10 mx-auto text-center text-xl md:text-4xl md:m-5'>Produtos</h2>
            <div className='px-5 md:px-24'>
                <ul className='md:grid md:grid-cols-2'>
                    {flexibleProducts.map((flexibleProduct, index) => (
                        <li className='grid grid-cols-2 py-2 items-center' key={index}>
                            <label className=''>{flexibleProduct.name} - R${flexibleProduct.value.toFixed(2)}</label>

                            <input className='translate-x-14 border-2 border-gray-700 w-20 h-10 text-center'
                                type="number"
                                min="0"
                                value={quantities[flexibleProduct.name] || ''}
                                onChange={(event) =>
                                    handleQuantityChange(flexibleProduct.name, event.target.value)
                                }
                            />
                        </li>
                    ))}
                </ul>
            </div>
            <div className='my-10 text-center md:grid md:grid-cols-2 items-center'>
                <div className='discount-container'>
                    <div>
                        <label className='px-2 text-3xl text-green-700'>Desconto (%):</label>
                        <input className='w-20 h-10 text-center text-3xl text-green-700 border-2 border-gray-700 focus:outline-none focus:border-green-500'
                            type="number"
                            min="0"
                            max="100"
                            value={discount}
                            onChange={handleDiscountChange}
                        />

                    </div>
                    <div className='inline-flex my-5'>
                        <div className='px-2'>
                            <button className='py-2 px-4 bg-purple-900 border-2 border-purple-900 text-white hover:bg-white hover:text-black hover:border-2 hover:border-black' onClick={handleSubmit}>Calcular</button>
                        </div>
                        <div className='px-2'>
                            <button className='py-2 px-6 bg-purple-900 border-2 border-purple-900 text-white hover:bg-white hover:text-black hover:border-2 hover:border-black' onClick={handleReset}>Resetar</button>
                        </div>
                    </div>
                </div>
                <div className='flex-col justify-center'>
                    {totalDiscount !== 0 && (
                        <div className='mx-auto text-center'>
                            <p className='text-xl'>Total com Desconto: R${totalDiscount.toFixed(2)}</p>
                            <p className='text-xl'>Valor das Parcelas: 3 X R${parcelValue}</p>
                        </div>
                    )}
                </div>
            </div>

        </div>
    );
}
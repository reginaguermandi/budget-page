import React, { useState, useEffect } from 'react';
import products from '../../products';

export default function Products() {
    const [quantities, setQuantities] = useState({});
    const [discount, setDiscount] = useState(0);
    const [totalWithDiscount, setTotalWithDiscount] = useState(0);
    const [installmentValue, setInstallmentValue] = useState(0);

    const handleQuantityChange = (productName, quantity) => {
        setQuantities((prevQuantities) => ({
            ...prevQuantities,
            [productName]: quantity,
        }));
    };

    const handleDiscountChange = (event) => {
        const newDiscount = parseFloat(event.target.value);

        if (!isNaN(newDiscount) && newDiscount >= 0 && newDiscount <= 100) {
            setDiscount(newDiscount);
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        let totalWithDiscount = 0;
        let totalWithoutDiscount = 0;
        let installmentValue = 0;

        for (const product of products) {
            const quantity = quantities[product.name] || 0;
            const subtotal = product.price * quantity;

            totalWithoutDiscount += subtotal;
            totalWithDiscount += subtotal;
        }

        const discountDecimal = parseFloat(discount) / 100;
        const discountAmount = totalWithoutDiscount * discountDecimal;
        totalWithDiscount -= discountAmount;

        installmentValue = totalWithDiscount / 3;

        setTotalWithDiscount(totalWithDiscount);
        setInstallmentValue(installmentValue.toFixed(2));
    };

    const handleReset = () => {
        setQuantities({});
        setDiscount(0);
        setTotalWithDiscount(0);
        setInstallmentValue(0);
    };

    return (
        <div>
            <h2 className='my-10 mx-auto text-center text-xl md:text-4xl md:m-5'>Produtos</h2>
            <div className='px-5 md:px-24'>
                <ul className='md:grid md:grid-cols-2'>
                    {products.map((product, index) => (
                        <li className='grid grid-cols-2 py-2 items-center' key={index}>
                            <label className=''>{product.name} - R${product.price.toFixed(2)}</label>

                            <input className='translate-x-14 border-2 border-gray-700 w-20 h-10 text-center'
                                type="number"
                                min="0"
                                value={quantities[product.name] || ''}
                                onChange={(event) =>
                                    handleQuantityChange(product.name, event.target.value)
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
                    {totalWithDiscount !== 0 && (
                        <div className='mx-auto text-center'>
                            <p className='text-xl'>Total com Desconto: R${totalWithDiscount.toFixed(2)}</p>
                            <p className='text-xl'>Valor das Parcelas: 3 X R${installmentValue}</p>
                        </div>
                    )}
                </div>
            </div>

        </div>
    );
}
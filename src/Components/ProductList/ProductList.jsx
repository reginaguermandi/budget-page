import React, { useState } from 'react';
import products from '../../products';

export default function ProductList() {
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
        setDiscount(event.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Logic to add the values with the selected quantities and apply the discount
        let total = 0;
        for (const product of products) {
            const quantity = quantities[product.name] || 0;
            total += product.price * quantity;
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
            <h2 className='my-10 mx-auto text-center text-3xl'>Produtos</h2>
            <div>
                <div className='mx-16 text-center'>
                    <ul className='md:grid md:grid-cols-2 '>
                        {products.map((product, index) => (
                            <li className='p-10 text-left text-xl border-2' key={index}>
                                <div className='my-2'>
                                    {product.name} - R${product.price.toFixed(2)}
                                </div>
                                <div className='my-2'>
                                    <label>
                                        Quantidade:
                                        <input className='w-14 h-7 border-2 mx-2 border-black'
                                            type="number"
                                            min="0"
                                            value={quantities[product.name] || ''}
                                            onChange={(event) =>
                                                handleQuantityChange(product.name, event.target.value)
                                            }
                                        />
                                    </label>
                                </div>
                            </li>
                        ))}
                    </ul>
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
                                <div>
                                    <p>Total com Desconto: R${totalDiscount.toFixed(2)}</p>
                                    <p>Valor das Parcelas: 3 X R${parcelValue}</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};

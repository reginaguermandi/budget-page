import React, { useState } from 'react';
import products from '../../data';

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
        setDiscount(event.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Logic to add the values with the selected quantities and apply the discount
        let total = 0;
        for (const product of products) {
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

    return (
        <div>
            <h2>Lista de Produtos</h2>
            <ul>
                {products.map((product, index) => (
                    <li key={index}>
                        {product.name} - R${product.value.toFixed(2)}
                        <input className='border-2 border-neutral-950 w-20 h-10'
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
            <div>
                <label>
                    Desconto (%):
                    <input className='border-2 border-lime-500'
                        type="number"
                        min="0"
                        value={discount}
                        onChange={handleDiscountChange}
                    />
                </label>
            </div>
            <button className='border-2 border-black p-5'
                onClick={handleSubmit}>Submit</button>
            {totalDiscount !== 0 && (
                <div>
                    <p>Total com Desconto: R${totalDiscount.toFixed(2)}</p>
                    <p>Valor das Parcelas: R${parcelValue}</p>
                </div>
            )}
        </div>
    );
}
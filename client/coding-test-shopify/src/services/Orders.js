import axios from "axios";

export async function getOrdersByDate(inicialdate, finaldate){
    const url = `https://conding-test-shopify.onrender.com/api/orders/processed?dataInicial=${inicialdate}&dataFinal=${finaldate}`
    const accessToken = localStorage.getItem('accessToken');

    const response = await axios.get(url,{
        headers: {
            "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
    });

    return response.data.products;
}

export async function getOrdersByMonth(month){
    const url = `https://conding-test-shopify.onrender.com/api/orders/month?month=${month}`
    const accessToken = localStorage.getItem('accessToken');

    const response = await axios.get(url,{
        headers: {
            "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
    });

    return response.data.products;
}
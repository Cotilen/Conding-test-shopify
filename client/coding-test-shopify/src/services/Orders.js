import axios from "axios";

export async function getOrdersByDate(inicialdate, finaldate){
    const url = `http://localhost:3000/api/orders/processed?dataInicial=${inicialdate}&dataFinal=${finaldate}`

    const response = await axios.get(url);

    return response.data.products;
}
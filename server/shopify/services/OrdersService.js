import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

function processarPedidos(pedidos) {
    const resultado = {
        products: [],
    };

    pedidos.forEach((pedido) => {
        pedido.line_items.forEach((item) => {
            const name = item.name;
            const quantity_sold = item.quantity;
            const total_sales_value = item.price * quantity_sold;

            let produtoExistente = resultado.products.find(produto => produto.name === name);

            if (!produtoExistente) {
                produtoExistente = {
                    name: name,
                    quantity_sold: 0,
                    total_sales_value: 0,
                    customers: [],
                };
                resultado.products.push(produtoExistente);
            }

            produtoExistente.quantidadeVendida += quantity_sold;
            produtoExistente.valorTotal += total_sales_value;

            const nomeCliente = pedido.customer.id ? "Desconhecido: " + pedido.customer.id : 'Desconhecido';
            const emailCliente = 'Não informado';
            const dataProcessamento = pedido.processed_at;
            const dataCriacao = pedido.created_at;

            if (!produtoExistente.customers.some(cliente => cliente.nome === nomeCliente)) {
                produtoExistente.customers.push({
                    name: nomeCliente,
                    email: emailCliente,
                    creation_date: dataCriacao,
                    process_date: dataProcessamento
                });
            }
        });
    });

    return resultado;
}

export const getOrdersbyDate = async (req, res) => {
    const { dataInicial, dataFinal } = req.query;

    if (!dataInicial || !dataFinal) {
        try {
            const url = `https://voyant-sandbox.myshopify.com/admin/api/2024-10/orders.json`;

            const params = {
                status: "any",
                fields: 'id,created_at,customer,line_items,total_price, processed_at',
            };

            const response = await axios.get(url, {
                headers: {
                    'X-Shopify-Access-Token': process.env.ACCESS_TOKEN,
                },
                params: params,
            });

            const dados = processarPedidos(response.data.orders);

            if (Object.keys(dados.products).length === 0) {
                res.status(200).json({ products: [], message: 'Nenhuma venda encontrada para o período especificado.' });
            }

            res.status(200).json(dados);
        } catch (error) {
            console.log(error);
        }
    } else {
        try {
            const url = `https://voyant-sandbox.myshopify.com/admin/api/2024-10/orders.json`;

            const params = {
                created_at_min: dataInicial,
                created_at_max: dataFinal,
                status: "any",
                fields: 'id,created_at,customer,line_items,total_price, processed_at',
            };

            const response = await axios.get(url, {
                headers: {
                    'X-Shopify-Access-Token': process.env.ACCESS_TOKEN,
                },
                params: params,
            });

            const dados = processarPedidos(response.data.orders);

            if (Object.keys(dados.products).length === 0) {
                res.status(200).json({ products: [], message: 'Nenhuma venda encontrada para o período especificado.' });
            } else {
                res.status(200).json(dados);
            }

        } catch (error) {
            console.log(error);
        }
    }

};

export const getOrdersbyDateProcessed = async (req, res) => {
    const { dataInicial, dataFinal } = req.query;

    try {
        const url = `https://voyant-sandbox.myshopify.com/admin/api/2024-10/orders.json`;

        const params = {
            processed_at_min: dataInicial,
            processed_at_max: dataFinal,
            status: "any",
            fields: 'id,created_at,customer,line_items,total_price, processed_at',
        };

        const response = await axios.get(url, {
            headers: {
                'X-Shopify-Access-Token': process.env.ACCESS_TOKEN,
            },
            params: params,
        });

        const dados = processarPedidos(response.data.orders);

        if (Object.keys(dados.products).length === 0) {
            res.status(200).json({ products: [], message: 'Nenhuma venda encontrada para o período especificado.' });
        } else {
            res.status(200).json(dados);
        }

    } catch (error) {
        console.log(error);
    }

};
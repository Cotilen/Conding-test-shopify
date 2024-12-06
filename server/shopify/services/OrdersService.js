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

            produtoExistente.quantity_sold += quantity_sold;
            produtoExistente.total_sales_value += total_sales_value;

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

function getFirstAndLastDayOfMonth(month, year) {
    switch (month) {
      case 1: // Janeiro
        return { firstDay: `${year}-01-01`, lastDay: `${year}-01-31` };
      case 2: // Fevereiro
        const isLeapYear = year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);
        return {
          firstDay: `${year}-02-01`,
          lastDay: `${year}-02-${isLeapYear ? 29 : 28}`,
        };
      case 3: // Março
        return { firstDay: `${year}-03-01`, lastDay: `${year}-03-31` };
      case 4: // Abril
        return { firstDay: `${year}-04-01`, lastDay: `${year}-04-30` };
      case 5: // Maio
        return { firstDay: `${year}-05-01`, lastDay: `${year}-05-31` };
      case 6: // Junho
        return { firstDay: `${year}-06-01`, lastDay: `${year}-06-30` };
      case 7: // Julho
        return { firstDay: `${year}-07-01`, lastDay: `${year}-07-31` };
      case 8: // Agosto
        return { firstDay: `${year}-08-01`, lastDay: `${year}-08-31` };
      case 9: // Setembro
        return { firstDay: `${year}-09-01`, lastDay: `${year}-09-30` };
      case 10: // Outubro
        return { firstDay: `${year}-10-01`, lastDay: `${year}-10-31` };
      case 11: // Novembro
        return { firstDay: `${year}-11-01`, lastDay: `${year}-11-30` };
      case 12: // Dezembro
        return { firstDay: `${year}-12-01`, lastDay: `${year}-12-31` };
      default:
        return { error: "Mês inválido. Deve estar entre 1 e 12." };
    }
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


export const getOrdersbyMonth = async (req, res) => {
    const query = req.query.month;
    
    const [year, month] = query.split('-');
    const date = getFirstAndLastDayOfMonth(parseInt(month), parseInt(year));

    if (!date.firstDay ||!date.lastDay) {
        return res.status(400).json({ error: date.error });
    }

    try {
        const url = `https://voyant-sandbox.myshopify.com/admin/api/2024-10/orders.json`;

        const params = {
            processed_at_min: date.firstDay,
            processed_at_max: date.lastDay,
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
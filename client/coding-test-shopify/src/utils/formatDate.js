export const formatToBRLDate = (date) => {
	// Verifica se a entrada é uma string, se for converte para Date
	const dateObj = typeof date === "string" ? new Date(date) : date;

	// Verifica se a data é válida
	// biome-ignore lint/suspicious/noGlobalIsNan: <explanation>
	if (isNaN(dateObj.getTime())) {
		return ""; // Retorna string vazia se a data for inválida
	}

	// Formata a data para o padrão brasileiro (dd/mm/yyyy)
	const dataFormatada = new Intl.DateTimeFormat("pt-BR", {
		day: "2-digit",
		month: "2-digit",
		year: "numeric",
	}).format(dateObj);

	return dataFormatada;
};
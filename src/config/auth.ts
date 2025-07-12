export default {
	secret_token: process.env.SECRET_TOKEN!,
	secret_refresh_token: process.env.SECRET_REFRESH_TOKEN!,
	expires_in_token: Number(process.env.EXPIRES_IN_TOKEN) || 15, // minutos
	expires_in_refresh_token: Number(process.env.EXPIRES_IN_REFRESH_TOKEN) || 30, // dias
	expires_refresh_token_days: Number(
		process.env.EXPIRES_REFRESH_TOKEN_DAYS || 30 // dias
	),
};

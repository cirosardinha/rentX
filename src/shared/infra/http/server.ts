import { app } from "./app";

app.listen(3333, () =>
	console.log("Server is running on port", process.env.PORT)
);

import app from "./main";
import "dotenv/config";

const PORT = process.env.PORT || 3334;

app.listen(PORT, () => {
	console.log(`server is running... on port ${PORT}`);
});

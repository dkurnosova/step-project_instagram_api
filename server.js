import app from "./index.js";
import chalk from "chalk";
import mongoose from "mongoose";

const PORT = process.env.PORT || 3001;
const DB_URL =
   "mongodb+srv://kurnos:6405005@cluster0.w2azlmf.mongodb.net/Instagram_step-project?retryWrites=true&w=majority";

main().catch((err) => console.log(err));

async function main() {
   await mongoose.connect(DB_URL);

   app.listen(PORT, () => {
      console.log(chalk.magenta("*********************************"));
      console.log(chalk.cyan(`Connected to DB`));
      console.log(chalk.magenta("*********************************"));
      console.log(chalk.cyan(`Server is listening on Port ${PORT}`));
      console.log(chalk.magenta("*********************************"));
   });
}

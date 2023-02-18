import express from "express";
import loginRouter from "./routes/login.mjs";
import moRouter from "./routes/mo.mjs";
import moTypeRouter from "./routes/motype.mjs";
import signalInfoRouter from "./routes/signalinfo.mjs";

const PORT = 16209;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(`/session`, loginRouter);
app.use(`/mo`, moRouter);
app.use(`/motype`, moTypeRouter);
app.use(`/signalinfo`, signalInfoRouter);

async function run() {
  app.listen(PORT, () => {
    console.log(`Listening on ${PORT}...`);
  });
}

run().catch((err) => {
  console.error(err.stack);
});

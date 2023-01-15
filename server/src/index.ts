import app from './server';
import * as dotenv from 'dotenv';
dotenv.config();
const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Running on port ${port}`);
});

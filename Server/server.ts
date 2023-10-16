const dotenv = require('dotenv');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
dotenv.config({ path: './config.env' })

const _app = require('./app.ts');

mongoose.connect(process.env.DATABASE, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}
).then(() => {
  console.log('DB connection successful');
})

_app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});


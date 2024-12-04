// app.js
const express = require('express');
const app = express();
const userRoute = require('./routes/user.routes.js');
const accountRoute = require('./routes/account.routes.js');
const transactionRoute = require('./routes/transaction.routes.js')
const recurringPaymentRoute = require('./routes/recurringPayment.routes.js')

app.use('/api', userRoute);
app.use('/api', accountRoute);
app.use('/api', transactionRoute);
app.use('/api', recurringPaymentRoute);

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});
const MISTIC_CI = process.env.MISTIC_CI;
const MISTIC_CS = process.env.MISTIC_CS;
const API_URL = 'https://api.misticpay.com/api/transactions/create';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(445).json({ message: 'Method not allowed' });
  }

  const { amount, payerName, payerDocument, transactionId, description } = req.body;

  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'ci': MISTIC_CI,
        'cs': MISTIC_CS
      },
      body: JSON.stringify({
        amount,
        payerName,
        payerDocument,
        transactionId,
        description
      })
    });

    const data = await response.json();
    return res.status(response.status).json(data);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}

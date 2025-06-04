# BidSetu 2.0 Setup

## Backend
```bash
cd backend
npm install
npm start
```

## Frontend
```bash
cd frontend
npm install
npm run dev
```

## Sample Users
| Role   | Email            | Password |
|--------|------------------|----------|
| Buyer  | buyer@test.com   | password |
| Seller | seller1@test.com | password |
| Seller | seller2@test.com | password |

Use these accounts after running the seed script (`npm run seed` inside `backend`) to try the complete flow.

Sellers can only submit one quote per RFQ. If a seller tries to quote again on the same RFQ, the API returns a 400 error.

# Siddhant Yojit Portfolio

A clean static Next.js portfolio for Siddhant Yojit.

## What’s included

- Public routes plus an admin booking dashboard
- Static local content in `data/`
- The existing visual design
- A slot booking flow on the contact page

## Routes

- `/`
- `/education`
- `/skills`
- `/projects`
- `/my-work`
- `/certificate`
- `/experience`
- `/contact`
- `/admin`

## Development

```bash
npm install
npm run dev
```

## Notes

- Booking requests are stored in `data/booking-requests.json`.
- The admin page shows the latest booking requests in newest-first order.
- There is no auth layer, so treat `/admin` as a lightweight internal page for local/demo use.

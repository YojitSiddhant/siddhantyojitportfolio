# Siddhant Yojit Portfolio

A clean static Next.js portfolio for Siddhant Yojit.

## What’s included

- Public routes only
- Static local content in `data/`
- The existing visual design
- The contact page and Web3Forms integration

## Routes

- `/`
- `/education`
- `/skills`
- `/projects`
- `/my-work`
- `/certificate`
- `/experience`
- `/contact`

## Development

```bash
npm install
npm run dev
```

## Environment

Set the Web3Forms access key if you want the contact form to submit successfully:

```bash
NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY=""
```

## Notes

- There is no CMS, admin area, database, or auth layer anymore.
- All public content is stored locally in the `data/` folder.

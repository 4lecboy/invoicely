# Invoicely

A modern invoicing application designed for freelancers to create, manage, and track invoices effortlessly.

## Features

- 📄 Quick invoice creation with professional templates
- 💳 Automated payment processing and reminders
- 📊 Smart dashboard for tracking payments and revenue
- 🌙 Dark mode support
- 🔐 Secure authentication with Google Sign-in

## Tech Stack

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Supabase
- Shadcn UI

## Getting Started

1. Clone the repository:
```bash
git clone https://github.com/yourusername/invoicely.git
cd invoicely
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file based on `.env.example`:
```bash
cp .env.example .env
```

4. Start the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## Environment Variables

Make sure to set up the following environment variables in your `.env` file:

```bash
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## Project Structure

```
app/               # Next.js app router pages
components/        # Reusable React components
lib/              # Utility functions and shared logic
public/           # Static assets
schema/           # Database schema
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT

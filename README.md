# EasyPost Shipping Label Generator

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app), integrated with the [EasyPost API](https://www.easypost.com/) for generating and printing shipping labels.

## 🚀 Quick Start

1. **Install dependencies:**

```bash
npm install
# or
yarn
# or
pnpm install
```

2. **Set your EasyPost API key in an `.env.local` file:**

```env
EASYPOST_API_KEY=your_api_key_here
```

3. **Run the development server:**

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🧠 Assumptions

- Shipments are between U.S. addresses only (validated via Zod schema).
- Parcel data is assumed to be a single package per shipment.
- Default sender and recipient data is prefilled for faster testing.

---

## ✅ What Works

- Address form with validation using [Zod](https://zod.dev/).
- Rate selection with radio buttons.
- Integration with EasyPost to create and purchase shipments.
- Label generation, download, and print functionality.
- Global loading state via context and modal loader.

---

## 🔧 What I’d Improve Next

1. **💅 Layout/Styling**

   - Extract repeated classNames into Tailwind components or utilities.
   - Improve responsiveness and spacing consistency.

2. **🔄 Componentization**

   - Extract `Button`, `Input`, and `FormGroup` components to ensure reuse and DRY code.

3. **📣 Toast Notifications**

   - Add a global toast system (e.g. `react-hot-toast`) to show success and error messages instead of `console.error`.

4. **⚠️ Error Handling**

   - Improve network error handling with user feedback.
   - Catch and display validation errors per form field more gracefully.

5. **🧪 Testing**

   - Add remaining unit tests using RTL + Jest.
   - Maintain Test-Driven Development (TDD) discipline moving forward.

6. **📦 Enhancements**
   - Support multi-parcel shipments.
   - Allow dynamic address storage for recurring users.

---

## 🧪 Tech Stack

- **Frontend**: React + Next.js 14 (App Router)
- **Forms**: React Hook Form + Zod
- **Styling**: TailwindCSS
- **API Integration**: EasyPost
- **Testing**: Jest + React Testing Library
- **Build Tooling**: TypeScript, ESLint, Prettier

---

## 🧭 Deployment

Ready to deploy on platforms like [Vercel](https://vercel.com/) or [Netlify](https://www.netlify.com/).

For detailed deployment instructions, see [Next.js Deployment Docs](https://nextjs.org/docs/app/building-your-application/deploying).

---

## 📂 License

MIT — feel free to fork, use, and modify for personal or commercial projects.

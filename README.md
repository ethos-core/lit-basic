# lit-basic

A collection of basic Lit web components built with TypeScript and Vite.

## Components

| Component | Description |
|-----------|-------------|
| `<lit-counter>` | Increment/decrement counter with custom event dispatch |
| `<lit-star-rating>` | Interactive star rating with keyboard and click support |
| `<lit-todo-list>` | Todo list with add, toggle, and delete functionality |
| `<lit-user-card>` | User profile card |

## Tech Stack

- [Lit](https://lit.dev/) 3.x
- TypeScript
- Vite

## Getting Started

```bash
npm install
npm run dev
```

Open http://localhost:5173 in your browser.

## Project Structure

```
├── index.html
├── src/
│   ├── components/
│   │   ├── lit-counter.ts
│   │   ├── lit-star-rating.ts
│   │   ├── lit-todo-list.ts
│   │   └── lit-user-card.ts
│   └── main.ts
├── tsconfig.json
└── package.json
```

## License

ISC

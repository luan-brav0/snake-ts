import { Elysia, t } from "elysia";
import { html } from "@elysiajs/html";
import * as elements from "typed-html";

// const app = new Elysia().get("/", () => "Hello Elysia").listen(3000);

export const app = new Elysia()
  .use(html())
  .get("/", ({ html }) =>
    html(
      <BaseHTML>
        <body class="flex flex-col w-full h-screen justify-center items-center align-middle">
          <h1 class="bold text-3xl my-2">🐍 Snake.tsx</h1>
          <h3 class="bold text-xl my-2">
            Made with HTM<b class="ml-[-0.5rem] text-[#3d72d7]">X</b> from 🦊
            Elysia, with TailwindCSS
          </h3>
        </body>
      </BaseHTML>,
    ),
  )
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`,
);

const BaseHTML = ({ children }: elements.Children) => `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Beth Notes</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <script src="https://unpkg.com/htmx.org@1.9.9" integrity="sha384-QFjmbokDn2DjBjq+fM+8LUIVrAgqcNW2s0PjAxHETgRn9l4fvX31ZxDxvwQnyMOX" crossorigin="anonymous"></script>
  </head>
${children}
</html>
`;

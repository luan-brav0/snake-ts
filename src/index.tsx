import { Elysia, t } from "elysia";
import { html } from "@elysiajs/html";
import * as elements from "typed-html";

/*
 */
import {
    Cell,
    CellState,
    Direction,
    GRID_SIZE,
    GameState,
    Grid,
    Point,
    Snake,
    SnakeCell,
    initGrid,
    initSnake,
    placeFood,
    play,
} from "./script";

const app = new Elysia()
    .use(html())

    //TODO: Figure how to properly type { html } with TypeBox on Elysia
    .get("/", ({ html }) =>
        html(
            <BaseHTML>
                <body class="flex flex-col w-full h-screen justify-center items-center align-middle">
                    <h1 class="bold text-3xl my-2">
                        <b class="text-[#3d72d7]">Snake.ts</b>🐍
                    </h1>
                    <div
                        hx-get="/snake"
                        hx-trigger="load"
                        hx-swap="outerHTML"
                    />
                </body>
            </BaseHTML>
        )
    )

    .get("/snake", (): JSX.Element => {
        console.log("getting /snake")
        return <Canvas grid={gs.grid} />;
    })

    .post("/snake/:x/:y",({params}):JSX.Element => {
        return <Pixel {...params} />
    },
    {
        params: t.Object({
            state: t.Enum(CellState),
            x: t.Numeric(),
            y: t.Numeric()
        })
    })

    .listen(3000);

console.log(
    `🦊 Elysia is running @ ${app.server?.hostname}:${app.server?.port}`,
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

let gs: GameState = {
    isStillAlive: true,
    grid: initGrid(),
    snake: initSnake(),
    food: [0, 0],
    foodPlaced: false,
    curDirection: Direction.Up,
    lastDirection: Direction.Up
};
gs.food = placeFood(gs.grid);
function continueGame(): void {
    gs = play(gs);
}
continueGame();
console.log("Game State:", gs);


type Pixel = { state: CellState, x: number, y: number };
const Pixel = ({ state, x, y }: Pixel): JSX.Element => {
    const style: string = "w-3 h-3 text-3 border text-black ";
    const c: string =  style + " " + state + " " + x.toString() + " " +  y.toString();

    switch (state) {
        case CellState.Empty:
            return <div id={`${x}-${y}`} class={c + " bg-gray-500"} hx-post={`/snake/pixel/${x}/${y}`} hx-target={`#${x}-${y}`} hx-swap="outerHTML" />;
        case CellState.Snake:
            return <div id={`${x}-${y}`} class={c + " bg-green-500"} hx-post={`/snake/pixel/${x}/${y}`} hx-target={`#${x}-${y}`} hx-swap="outerHTML" />;
        case CellState.Food:
            return <div id={`${x}-${y}`} class={c + " bg-red-500"} hx-post={`/snake/pixel/${x}/${y}`} hx-target={`#${x}-${y}`} hx-swap="outerHTML" />;
    }
};

const Canvas = ({ grid }: { grid: Grid }): JSX.Element => {
        console.log("loading canvas")
    return <div id="grid" class={`grid grid-cols-${GRID_SIZE}`}>
        {...grid.map((row, x) => { 
            return <div id="row" class="flex flex-row">
                {...row.map((cell, y) => { 
                    if (cell.state != CellState.Empty) {
                        console.log(cell.state, x, y)
                    }
                    return <Pixel state={cell.state} x={x} y={y} />;
                }
                )}
            </div>;
        })}
    </div>;
}

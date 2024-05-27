export const SNAKE_INIT_SIZE: number = 2;
export const GRID_SIZE: number = 16;

export type Point = [number, number];

export enum Direction {
    Right = 0,
    Up,
    Left,
    Down,
}

export const directions: Array<Point> = [
    [1, 0],
    [0, 1],
    [-1, 0],
    [0, -1],
];

export enum CellState {
    Empty = "empty",
    Snake = "snake",
    Food = "food",
}

export interface Cell {
    state: CellState;
}

export type Grid = Array<Array<Cell>>;

export interface SnakeCell {
    coords: Point;
    direction: Direction;
}

export type SnakeBody = Array<SnakeCell>;

export interface Snake {
    body: SnakeBody;
    size: number;
}

export interface GameState {
    isStillAlive: boolean;
    grid: Grid;
    snake: Snake;
    food: Point;
    foodPlaced: boolean;
    curDirection: Direction;
    lastDirection: Direction;
}

export function initGrid(gridSize: number = GRID_SIZE): Grid {
    return Array.from(
        { length: gridSize },
        (): Array<Cell> => Array(gridSize).fill({ state: CellState.Empty }),
    );
}

export function initSnake(
    initSize: number = SNAKE_INIT_SIZE,
    initPosition: Point = [GRID_SIZE / 2, GRID_SIZE / 2],
    direction: Direction = Direction.Up,
): Snake {
    let body: SnakeBody = [];
    let x: number = initPosition[0];
    let y: number = initPosition[1];
    for (let i = 0; i < initSize; i++) {
        body.push({ coords: [x, y], direction: direction });
        x--;
    }
    return { body: body, size: initSize };
}

export function moveSnake(
    snake: Snake,
    newDirection: Direction,
): SnakeBody {
    // direction in which each snake cell will pull eachother
    let transformation: Point;
    let prevCellDirection: Direction = newDirection;
    let prevCellCoords: Point;
    snake.body.map((cell, i) => {
        // TODO: put into separate function
        transformation = directions[prevCellDirection];
        // if it's the snake's head move it in player's desired direction
        if (i == 0) {
            cell.coords[0] = cell.coords[0] + (transformation[0] % GRID_SIZE);
            cell.coords[1] = cell.coords[1] + (transformation[1] % GRID_SIZE);
            cell.direction = prevCellDirection;
        } 
        // else pull other body cells to their new position
        else {
            prevCellCoords = cell.coords;
            cell.direction = prevCellDirection;
        }
    });
    return snake.body;
}

export function updateGrid(grid: Grid, snake: Snake, food: Point): Grid {
    snake.body.forEach((cell: SnakeCell) => {
        grid[cell.coords[0]][cell.coords[1]].state = CellState.Snake;
    })
    grid[food[0]][food[1]].state = CellState.Food;
    return grid
}

// pick random place for food, without snake init
export function placeFood(grid: Grid): Point {
    let foodCoords: Point = [0, 0];
    while (grid[foodCoords[0]][foodCoords[1]].state != CellState.Empty) {
        foodCoords = [
            Math.floor(Math.random() * GRID_SIZE),
            Math.floor(Math.random() * GRID_SIZE),
        ];
    }
    return foodCoords;
}

export function play(gameState: GameState): GameState {
    let {
        isStillAlive,
        grid,
        snake,
        food,
        foodPlaced,
        curDirection,
        lastDirection,
    } = gameState;
    if (foodPlaced == false) {
        food = placeFood(grid);
        foodPlaced = true;
    }
    lastDirection = curDirection;
    snake.body = moveSnake(snake, curDirection);
    // snake found food ? grow bigger 
    if (snake.body[0].coords == food) {
        snake.size++;
        food = placeFood(grid);
        foodPlaced = true;
    }
    // check for snake collision with itself
    snake.body.map((cell: SnakeCell, i: number): void => {
        if (i != 0 && snake.body[0].coords == cell.coords) {
            isStillAlive = false;
        }
    });
    // update snake location on grid
    snake.body.forEach((cell: SnakeCell) => {
        grid[cell.coords[0]][cell.coords[1]].state = CellState.Snake;
    })
    // update food location on grid
    grid[food[0]][food[1]].state = CellState.Food;
    return {
        isStillAlive,
        grid,
        snake,
        food,
        foodPlaced,
        curDirection,
        lastDirection,
    };
}

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
    gs = play(gs)
}
console.log("Game State:", gs);

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

// pick random place for food, without snake init
export function placeFood(snake: Snake): Point {
    let foodIsNotOnSnake: boolean = true;
    let foodCoords: Point = [0, 0];
    while (foodIsNotOnSnake) {
        foodCoords = [
            Math.floor(Math.random() * GRID_SIZE),
            Math.floor(Math.random() * GRID_SIZE),
        ];
        for (let cell of snake.body) {
            if ((cell.coords = foodCoords)) {
                foodIsNotOnSnake = false;
                break;
            }
        }
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
    if (!foodPlaced) {
        food = placeFood(snake);
        foodPlaced = !foodPlaced;
    }
    lastDirection = curDirection;
    snake.body = moveSnake(snake, curDirection);
    if (snake.body[0].coords == food) {
        snake.size++;
    }
    snake.body.map((cell: SnakeCell): void => {
        if ((snake.body[0].coords == cell.coords)) {
            isStillAlive = false;
        }
    });
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

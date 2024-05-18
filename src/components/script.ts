let SNAKE_SIZE: number = 3;
const GRID_SIZE: number = 16;

type Point = [number, number];

enum Direction {
  Right = 0,
  Up,
  Left,
  Down,
}

const directions: Point[] = [
  [1, 0],
  [0, 1],
  [-1, 0],
  [0, -1],
];
enum CellState {
  Empty,
  Snake,
  Food,
}

interface Cell {
  state: CellState;
}

interface Snake {
  body: SnakeCell[];
  size: number;
}

interface SnakeCell {
  coords: Point;
  direction: Direction;
}

type Grid = Array<Array<Cell>>;
let GRID: Grid;

// create board to size and populate with 0
function initBoard(gridSize: number = GRID_SIZE): Grid {
  return Array.from({ length: gridSize }, () =>
    Array(gridSize).fill(CellState.Empty),
  );
}

function initSnake(
  initSize: number = SNAKE_SIZE,
  initPosition: Point = [GRID_SIZE / 2, GRID_SIZE / 2],
  direction: Direction = Direction.Up,
): Snake {
  let body: SnakeCell[] = [];
  let x: number = initPosition[0];
  let y: number = initPosition[1];
  for (let i = 0; i < initSize; i++) {
    body.push({ coords: [x, y], direction: direction });
    x--;
  }
  return { body: body, size: initSize };
}

function moveSnake(snake: Snake, newDirection: Direction): Snake {
  // get direction of SnakeCell
  // move cur SnakeCell
  // pass direction to previous SnakeCell
  // do the same for previous snakecell
  let transformation: Point;
  let prevCellDirection: Direction = newDirection;
  let prevCellCoords: Point;
  let isStillAlive: boolean = true;
  snake.body.forEach((cell, i) => {
    transformation = directions[prevCellDirection];
    if (i == 0) {
      cell.coords[0] = cell.coords[0] + (transformation[0] % GRID_SIZE);
      cell.coords[1] = cell.coords[1] + (transformation[1] % GRID_SIZE);
      cell.direction = prevCellDirection;
    } else {
      prevCellCoords = cell.coords;
      cell.direction = prevCellDirection;
    }
  });
  return snake;
}

// pick random place for food, without snake init
function placeFood(snake: Snake): Point {
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

//check if new possition is a valid one or if there is food

// eat food & grow

// update grid with new values consireding direction

/*
 * snake goes in direction
 * for each snake Cell
 *      set next direction to head and move
 *      give previous direction to previous node
 *
 * say 4x4
 * if head= (2,)
 * to traverse walls use position = coords + direction
 */

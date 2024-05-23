const ARRAY_SIZE: number = 10000;
const GRID_SIZE: number = 100;

let array: Array<number> = [];
let grid: Array<Array<number>> = [];

for (let i = 0; i < ARRAY_SIZE; i++) {
  array[i] = i;
}

for (let i = 0; i < GRID_SIZE; i++) {
  grid.push([]);
  for (let j = 0; j < GRID_SIZE; j++) {
    grid[i].push(j);
  }
}

console.log(`Array len ${array.length}\n`);
console.log(`Grid len ${grid.length}\n`);

const timeArray = (array: Array<number>): void => {
  array.map((item) => {
    console.log(item);
  });
};

const timeGrid = (grid: Array<Array<number>>): void => {
  grid.map((row) =>
    row.map((item) => {
      console.log(item);
    }),
  );
};

const arrayStart: number = performance.now();
timeArray(array);
const arrayEnd: number = performance.now();
const arrayTime: number = arrayEnd - arrayStart;

const gridStart: number = performance.now();
timeGrid(grid);
const gridEnd: number = performance.now();
const gridTime: number = gridEnd - gridStart;

const delta: number = gridTime / arrayTime;
console.log(`Using 1D arrays was ${delta} times faster`);

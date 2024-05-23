#include <stdio.h>
#include <time.h>

#define ARRAY_SIZE 10000 // Define the size of the array
#define GRID_SIZE 100

int main() {
  clock_t start_time, end_time;

  int oneDArr[ARRAY_SIZE];
  double oneD_time_taken;

  // Initialize the array with some values
  for (int i = 0; i < ARRAY_SIZE; i++) {
    oneDArr[i] = i;
  }

  // Start the clock
  start_time = clock();

  // Print each element in the array
  for (int i = 0; i < ARRAY_SIZE; i++) {
    printf("%d\n", oneDArr[i]);
  }

  // Stop the clock
  end_time = clock();

  // Calculate the time taken
  oneD_time_taken = ((double)(end_time - start_time));
  // Print the time taken

  // 2D ARRAY
  int twoDArr[GRID_SIZE][GRID_SIZE];
  double twoD_time_taken;

  // Initialize the array with some values
  for (int i = 0; i < GRID_SIZE; i++) {
    for (int j = 0; j < GRID_SIZE; j++) {
      twoDArr[i][j] = j;
    }
  }

  // Start the clock
  start_time = clock();
  printf("new time %f\n", (double)start_time);

  // Print each element in the array
  for (int i = 0; i < GRID_SIZE; i++) {
    for (int j = 0; j < GRID_SIZE; j++) {
      printf("%d\n", twoDArr[i][j]);
    }
  }

  // Stop the clock
  end_time = clock();
  printf("new time %f\n", (double)start_time);

  twoD_time_taken = ((double)(end_time - start_time));
  // Print the time taken
  printf("Time 1d arr: %f seconds\n", oneD_time_taken);
  printf("Time 2d arr: %f seconds\n", twoD_time_taken);

  // Comparing
  printf("the 1D Array was: %f times better",
         (twoD_time_taken / oneD_time_taken));

  return 0;
}

# sudoku-solver

Simple sudoku solver written with ES6/ES7 and React. Based on [excellent article of Peter Norvig](http://norvig.com/sudoku.html).

### Getting things up and running

```
git clone git@github.com:dahlie/sudoku-solver.git sudoku-solver
cd sudoku-solver
npm install
npm test
npm start
open http://localhost:9001 in your browser
```

### Usage

#### Parsing

Parser function reads the given puzzle and returns a map with values mapped according to following notation:

```
 A1 A2 A3| A4 A5 A6| A7 A8 A9
 B1 B2 B3| B4 B5 B6| B7 B8 B9
 C1 C2 C3| C4 C5 C6| C7 C8 C9
---------+---------+---------
 D1 D2 D3| D4 D5 D6| D7 D8 D9
 E1 E2 E3| E4 E5 E6| E7 E8 E9
 F1 F2 F3| F4 F5 F6| F7 F8 F9
---------+---------+---------
 G1 G2 G3| G4 G5 G6| G7 G8 G9
 H1 H2 H3| H4 H5 H6| H7 H8 H9
 I1 I2 I3| I4 I5 I6| I7 I8 I9
```

It also ignores all but the valid characters (numbers 1-9 and '0' or '.' for empty cells). So for example the following strings are treated the same. 

```
> parse('4.....8.5.3..........7......2.....6.....8.4......1.......6.3.7.5..2.....1.4......')

> parse(`
400000805
030000000
000700000
020000060
000080400
000010000
000603070
500200000
104000000
`)

> parse(`
4 . . |. . . |8 . 5 
. 3 . |. . . |. . . 
. . . |7 . . |. . . 
------+------+------
. 2 . |. . . |. 6 . 
. . . |. 8 . |4 . . 
. . . |. 1 . |. . . 
------+------+------
. . . |6 . 3 |. 7 . 
5 . . |2 . . |. . . 
1 . 4 |. . . |. . . 
`)
```

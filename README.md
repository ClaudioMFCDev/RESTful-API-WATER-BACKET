
# Water Jug Challenge

This RESTful API provides the shortest solution for 'Water Jug Challenge' using BFS (Breadth First Search) algorithm. This algorithm allows you to model the capacities of jars as states, and the actions you can perform (fill, empty, pour) as transitions between these states.




## Installation

1) Install Node.js using the oficial website
https://nodejs.org/en

Run the downloaded installer and follow the on-screen instructions.

Make sure the option to install npm (Node Package Manager) is selected.

Verify installation:

Open a terminal or command line.
Run node -v to verify that Node.js has been installed correctly.
Run npm -v to verify that npm is also installed.

2) Clone the Repository:

Open a terminal or command line.
Navigate to the directory where you want to clone the repository.
Run the following command:
```
git clone <URL-del-repositorio>
```
3) Install Dependencies
- Navigate to Project Directory:

Change to the cloned project directory:
```
cd repository-name
```

- Install Backend Dependencies:
```
npm install
```

4) Start the server

Navigate to the backend folder (if you are not already there).
Run the following command to start the backend server:
```
npm run dev
```


## API Reference

#### Post send parameters

```http
  POST /api/jugs/solucion
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `x` | `positive integer` | **Required**. Gallons first jug. |
| `y` | `positive integer` | **Required**. Gallons second jug. |
| `z` | `positive integer` | **Required**. Gallons objetive. |



It takes 2 values ​​and returns the most efficient response in JSON format, with the necessary and minimum steps to measure exactly Z gallons using two jugs of capacities X and Y gallons. 


## Tech Stack

**Server:** Node, Express, Nodemon, TypeScript.

**Tools:** Postman.


## Examples
### Possible answers:
1. If there is a solution: It returns the necessary steps.
2. If the format is not respected: It returns a message for example: 'The values ​​must be numeric' or 'The values ​​must be positive integers'.
3. If there is no solution: It returns: 'No solution'. This happens when the value of 'z' is greater than the jar with the largest volume ('x' or 'y'). Also if the value of 'z' is not divisible by the Greatest Common Divisor between 'x' and 'y'.

### Positive Example:
You have a 3-gallon jug and a 5-gallon jug, and you need to measure exactly 4 gallons.

Steps:
- Fill the 5-gallon jug: (5, 0).
- Pour water from the 5-gallon jug into the 3-gallon jug: (2, 3).
- Empty the 3-gallon jug: (2, 0).
- Pour water from the 5-gallon jug into the 3-gallon jug: (0, 2).
- Fill the 5-gallon jug again: (5, 2).
- Pour water from the 5-gallon jug into the 3-gallon jug: (4, 3).
- You now have exactly 4 gallons in the 5-gallon jug.

### No Solution Example:
x = 6 gallons, y = 4 gallons, z = 3 gallons: The GCD of 6 and 4 is 2, but 3 is not divisible by 2, so there is no solution.

### Using Postman tool:

#### Example 1

Into de body use:
```
{
  "x": 3,
  "y": 5,
  "z": 4
}
```
The response will be:
```
{
    "solution": [
        {
            "step": 1,
            "bucketX": 0,
            "bucketY": 5,
            "action": "Llenar la jarra de 5 galones"
        },
        {
            "step": 2,
            "bucketX": 3,
            "bucketY": 2,
            "action": "Pasar de jarra de 5 galones a 3 galones"
        },
        {
            "step": 3,
            "bucketX": 0,
            "bucketY": 2,
            "action": "Vaciar la jarra de 3 galones"
        },
        {
            "step": 4,
            "bucketX": 2,
            "bucketY": 0,
            "action": "Pasar de jarra de 5 galones a 3 galones"
        },
        {
            "step": 5,
            "bucketX": 2,
            "bucketY": 5,
            "action": "Llenar la jarra de 5 galones"
        },
        {
            "step": 6,
            "bucketX": 3,
            "bucketY": 4,
            "action": "Pasar de jarra de 5 galones a 3 galones",
            "status": "Solved"
        }
    ]
}
```

#### Example 2

Into de body use:
```
{
  "x": 6,
  "y": 4,
  "z": 3
}
```
The response will be:

```
{
    "solution": "No solution"
}
```

#### Example 3

Into de body use:
```
{
  "x": 6,
  "y": 0,
  "z": 3
}
```
The response will be:

```
{
    "error": "X, Y, y Z deben ser enteros positivos."
}
```

#### Example 4

Into de body use:
```
{
  "x": "a",
  "y": 0,
  "z": 3
}
```
The response will be:

```
{
    "error": "Los parametros deber ser numeros"
}
```


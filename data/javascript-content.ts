import { ContentCard } from '@/types/content';

export const jsContent: ContentCard[] = [
  // Day 1: Introduction
  {
    id: '1-1',
    day: 1,
    title: 'Introduction to JavaScript',
    summary: 'JavaScript is a high-level programming language that follows the ECMAScript specification.',
    content: 'JavaScript is a high-level programming language that follows the ECMAScript specification. It was initially created to "make web pages alive". JavaScript can update and change both HTML and CSS, and can calculate, manipulate and validate data. It is the third layer of standard web technologies after HTML and CSS.',
    tags: ['basics', 'introduction']
  },
  {
    id: '1-2',
    day: 1,
    title: 'Adding JavaScript to a Web Page',
    summary: 'JavaScript can be added to a web page in three ways: inline, internal, and external scripts.',
    content: 'JavaScript can be added to a web page in three different ways:\n\n1. Inline script - directly in HTML\n2. Internal script - using <script> tags in HTML\n3. External script - separate .js files linked to HTML',
    codeExample: '<!-- Inline -->\n<button onclick="alert(\'Hello, World!\')">Click Me</button>\n\n<!-- Internal -->\n<script>\n  console.log(\'Hello from internal script\');\n</script>\n\n<!-- External -->\n<script src="script.js"></script>',
    tags: ['basics', 'web']
  },
  {
    id: '1-3',
    day: 1,
    title: 'JavaScript Data Types',
    summary: 'JavaScript has primitive and non-primitive data types.',
    content: 'JavaScript has two main categories of data types:\n\n1. Primitive data types: String, Number, Boolean, undefined, null, and Symbol.\n2. Non-primitive data types: Objects, Arrays, and Functions.\n\nPrimitive data types are immutable, while non-primitive data types are mutable.',
    codeExample: '// Primitive types\nlet name = "John"; // string\nlet age = 25; // number\nlet isStudent = true; // boolean\nlet job = undefined; // undefined\nlet salary = null; // null\n\n// Non-primitive types\nlet person = { name: "John", age: 25 }; // object\nlet skills = ["HTML", "CSS", "JS"]; // array\nlet greet = function() { return "Hello!" }; // function',
    tags: ['basics', 'data types']
  },
  
  // Day 2: Data Types
  {
    id: '2-1',
    day: 2,
    title: 'Primitive Data Types',
    summary: 'Learn about strings, numbers, booleans, null, undefined, and symbols.',
    content: 'Primitive data types in JavaScript include:\n\n- String: Sequence of characters (e.g., "Hello")\n- Number: Integers and floating-point numbers (e.g., 5, 3.14)\n- Boolean: true or false values\n- Null: Empty value or no value\n- Undefined: Declared variable without a value\n- Symbol: Unique and immutable primitive value',
    codeExample: 'let name = "John"; // string\nlet age = 25; // number\nlet isStudent = true; // boolean\nlet job = undefined; // undefined\nlet salary = null; // null\nlet id = Symbol("id"); // symbol',
    tags: ['data types', 'primitive']
  },
  {
    id: '2-2',
    day: 2,
    title: 'Non-Primitive Data Types',
    summary: 'Learn about objects, arrays, and functions.',
    content: 'Non-primitive data types in JavaScript include:\n\n- Objects: Collections of key-value pairs\n- Arrays: Ordered collections of values\n- Functions: Reusable blocks of code\n\nNon-primitive data types are mutable and are passed by reference.',
    codeExample: '// Object\nlet person = {\n  name: "John",\n  age: 25,\n  isStudent: true\n};\n\n// Array\nlet skills = ["HTML", "CSS", "JavaScript"];\n\n// Function\nfunction greet() {\n  return "Hello, World!";\n}',
    tags: ['data types', 'non-primitive']
  },
  
  // Day 3: Operators
  {
    id: '3-1',
    day: 3,
    title: 'Arithmetic Operators',
    summary: 'Learn about addition, subtraction, multiplication, division, and more.',
    content: 'JavaScript supports these arithmetic operators:\n\n- Addition (+)\n- Subtraction (-)\n- Multiplication (*)\n- Division (/)\n- Modulus (%) - remainder of division\n- Exponentiation (**) - power of\n- Increment (++) - increase by 1\n- Decrement (--) - decrease by 1',
    codeExample: 'let a = 10;\nlet b = 3;\n\nlet sum = a + b; // 13\nlet difference = a - b; // 7\nlet product = a * b; // 30\nlet quotient = a / b; // 3.33...\nlet remainder = a % b; // 1\nlet power = a ** b; // 1000\n\nlet x = 5;\nx++; // x is now 6\nx--; // x is now 5 again',
    tags: ['operators', 'arithmetic']
  },
  {
    id: '3-2',
    day: 3,
    title: 'Comparison Operators',
    summary: 'Learn about equality, inequality, greater than, less than, and more.',
    content: 'Comparison operators are used to compare values and return a boolean result:\n\n- Equal to (==) - compares values\n- Strict equal to (===) - compares values and types\n- Not equal to (!=)\n- Strict not equal to (!==)\n- Greater than (>)\n- Less than (<)\n- Greater than or equal to (>=)\n- Less than or equal to (<=)',
    codeExample: 'let a = 5;\nlet b = "5";\n\nconsole.log(a == b); // true (values are equal)\nconsole.log(a === b); // false (types are different)\nconsole.log(a != b); // false\nconsole.log(a !== b); // true\n\nconsole.log(a > 3); // true\nconsole.log(a < 10); // true\nconsole.log(a >= 5); // true\nconsole.log(a <= 4); // false',
    tags: ['operators', 'comparison']
  },
  
  // Day 4: Conditionals
  {
    id: '4-1',
    day: 4,
    title: 'If Statements',
    summary: 'Learn about conditional execution with if, else if, and else.',
    content: 'Conditional statements are used to perform different actions based on different conditions:\n\n- if: executes a block of code if a condition is true\n- else: executes a block of code if the same condition is false\n- else if: tests a new condition if the first condition is false',
    codeExample: 'let age = 18;\n\nif (age > 18) {\n  console.log("You are an adult");\n} else if (age === 18) {\n  console.log("You just became an adult");\n} else {\n  console.log("You are a minor");\n}\n\n// Output: "You just became an adult"',
    tags: ['conditionals', 'if statements']
  },
  {
    id: '4-2',
    day: 4,
    title: 'Switch Statements',
    summary: 'Learn about multi-way branching with switch statements.',
    content: 'The switch statement is used to perform different actions based on different conditions. It evaluates an expression and matches it with case clauses:\n\n- switch: evaluates an expression\n- case: defines a value to match\n- break: exits the switch block\n- default: executes if no case matches',
    codeExample: 'let day = 3;\nlet dayName;\n\nswitch (day) {\n  case 1:\n    dayName = "Monday";\n    break;\n  case 2:\n    dayName = "Tuesday";\n    break;\n  case 3:\n    dayName = "Wednesday";\n    break;\n  case 4:\n    dayName = "Thursday";\n    break;\n  case 5:\n    dayName = "Friday";\n    break;\n  default:\n    dayName = "Weekend";\n}\n\nconsole.log(dayName); // "Wednesday"',
    tags: ['conditionals', 'switch']
  },
  
  // Day 5: Arrays
  {
    id: '5-1',
    day: 5,
    title: 'Creating Arrays',
    summary: 'Learn different ways to create and initialize arrays.',
    content: 'Arrays are used to store multiple values in a single variable. There are two main ways to create arrays in JavaScript:\n\n1. Using array literal (square brackets)\n2. Using the Array() constructor\n\nArrays can contain different data types and are zero-indexed.',
    codeExample: '// Using array literal\nlet fruits = ["Apple", "Banana", "Orange"];\n\n// Using Array constructor\nlet numbers = new Array(1, 2, 3, 4, 5);\n\n// Empty array\nlet emptyArray = [];\n\n// Array with mixed data types\nlet mixedArray = ["John", 25, true, null, { country: "USA" }];',
    tags: ['arrays', 'data structures']
  },
  {
    id: '5-2',
    day: 5,
    title: 'Array Methods',
    summary: 'Learn about common array methods like push, pop, shift, unshift, and more.',
    content: 'JavaScript arrays have many built-in methods for array manipulation:\n\n- push(): adds elements to the end\n- pop(): removes the last element\n- shift(): removes the first element\n- unshift(): adds elements to the beginning\n- indexOf(): finds the index of an element\n- includes(): checks if an array contains an element\n- join(): joins all elements into a string\n- slice(): extracts a section of an array\n- splice(): adds/removes elements from an array',
    codeExample: 'let fruits = ["Apple", "Banana", "Orange"];\n\n// Adding elements\nfruits.push("Mango"); // ["Apple", "Banana", "Orange", "Mango"]\nfruits.unshift("Strawberry"); // ["Strawberry", "Apple", "Banana", "Orange", "Mango"]\n\n// Removing elements\nfruits.pop(); // Removes "Mango"\nfruits.shift(); // Removes "Strawberry"\n\n// Finding elements\nfruits.indexOf("Banana"); // 1\nfruits.includes("Orange"); // true\n\n// Other operations\nfruits.join(", "); // "Apple, Banana, Orange"\nfruits.slice(0, 2); // ["Apple", "Banana"]\nfruits.splice(1, 1, "Kiwi"); // Replaces "Banana" with "Kiwi"',
    tags: ['arrays', 'methods']
  },
  
  // Continue with more days...
  // Day 6: Loops
  {
    id: '6-1',
    day: 6,
    title: 'For Loop',
    summary: 'Learn about the standard for loop for iteration.',
    content: 'The for loop is one of the most commonly used loops in JavaScript. It consists of three parts:\n\n1. Initialization: executed once before the loop starts\n2. Condition: evaluated before each iteration\n3. Increment/Decrement: executed after each iteration\n\nThe loop continues as long as the condition is true.',
    codeExample: '// Print numbers from 1 to 5\nfor (let i = 1; i <= 5; i++) {\n  console.log(i);\n}\n\n// Iterate through an array\nlet fruits = ["Apple", "Banana", "Orange"];\nfor (let i = 0; i < fruits.length; i++) {\n  console.log(fruits[i]);\n}',
    tags: ['loops', 'iteration']
  },
  {
    id: '6-2',
    day: 6,
    title: 'While and Do-While Loops',
    summary: 'Learn about while and do-while loops for conditional iteration.',
    content: 'While and do-while loops execute a block of code as long as a condition is true:\n\n- while loop: checks the condition before executing the code\n- do-while loop: executes the code once before checking the condition\n\nUse while loops when you don\'t know how many iterations you need in advance.',
    codeExample: '// While loop\nlet i = 1;\nwhile (i <= 5) {\n  console.log(i);\n  i++;\n}\n\n// Do-while loop\nlet j = 1;\ndo {\n  console.log(j);\n  j++;\n} while (j <= 5);\n\n// The do-while loop always executes at least once\nlet k = 10;\ndo {\n  console.log(k); // This will print 10\n  k++;\n} while (k <= 5);',
    tags: ['loops', 'while', 'do-while']
  },
  
  // Day 7: Functions
  {
    id: '7-1',
    day: 7,
    title: 'Function Declaration',
    summary: 'Learn how to declare and call functions.',
    content: 'Functions are reusable blocks of code that perform a specific task. There are several ways to declare functions in JavaScript:\n\n1. Function Declaration\n2. Function Expression\n3. Arrow Function\n\nFunctions can take parameters and return values.',
    codeExample: '// Function Declaration\nfunction greet(name) {\n  return `Hello, ${name}!`;\n}\n\n// Function Expression\nconst sayHello = function(name) {\n  return `Hello, ${name}!`;\n};\n\n// Arrow Function\nconst welcome = (name) => {\n  return `Welcome, ${name}!`;\n};\n\n// Calling functions\nconsole.log(greet("John")); // "Hello, John!"\nconsole.log(sayHello("Jane")); // "Hello, Jane!"\nconsole.log(welcome("Bob")); // "Welcome, Bob!"',
    tags: ['functions', 'declaration']
  },
  {
    id: '7-2',
    day: 7,
    title: 'Function Parameters',
    summary: 'Learn about parameters, default parameters, and rest parameters.',
    content: 'Function parameters are the names listed in the function definition. They act as local variables within the function:\n\n- Regular parameters: values passed to the function\n- Default parameters: fallback values if no argument is provided\n- Rest parameters: represent an indefinite number of arguments as an array',
    codeExample: '// Regular parameters\nfunction add(a, b) {\n  return a + b;\n}\n\n// Default parameters\nfunction greet(name = "Guest") {\n  return `Hello, ${name}!`;\n}\n\n// Rest parameters\nfunction sum(...numbers) {\n  return numbers.reduce((total, num) => total + num, 0);\n}\n\nconsole.log(add(2, 3)); // 5\nconsole.log(greet()); // "Hello, Guest!"\nconsole.log(greet("John")); // "Hello, John!"\nconsole.log(sum(1, 2, 3, 4, 5)); // 15',
    tags: ['functions', 'parameters']
  },
  
  // Day 8: Objects
  {
    id: '8-1',
    day: 8,
    title: 'Creating Objects',
    summary: 'Learn different ways to create and initialize objects.',
    content: 'Objects are collections of key-value pairs. There are several ways to create objects in JavaScript:\n\n1. Object literal notation (using curly braces)\n2. Using the Object() constructor\n3. Using Object.create()\n\nObjects can contain properties (variables) and methods (functions).',
    codeExample: '// Object literal notation\nlet person = {\n  name: "John",\n  age: 30,\n  isStudent: false,\n  greet: function() {\n    return `Hello, my name is ${this.name}`;\n  }\n};\n\n// Using Object constructor\nlet car = new Object();\ncar.make = "Toyota";\ncar.model = "Corolla";\ncar.year = 2020;\n\n// Using Object.create()\nlet animal = Object.create(null);\nanimal.type = "Dog";\nanimal.name = "Rex";',
    tags: ['objects', 'creation']
  },
  {
    id: '8-2',
    day: 8,
    title: 'Object Methods',
    summary: 'Learn about accessing, modifying, and working with object properties and methods.',
    content: 'JavaScript provides several methods for working with objects:\n\n- Object.keys(): returns an array of a given object\'s property names\n- Object.values(): returns an array of a given object\'s property values\n- Object.entries(): returns an array of a given object\'s [key, value] pairs\n- Object.assign(): copies all properties from one or more source objects to a target object\n- Object.freeze(): prevents modification of existing properties and prevents adding new properties',
    codeExample: 'let person = {\n  name: "John",\n  age: 30,\n  country: "USA"\n};\n\n// Accessing properties\nconsole.log(person.name); // "John"\nconsole.log(person["age"]); // 30\n\n// Object methods\nconsole.log(Object.keys(person)); // ["name", "age", "country"]\nconsole.log(Object.values(person)); // ["John", 30, "USA"]\nconsole.log(Object.entries(person)); // [["name", "John"], ["age", 30], ["country", "USA"]]\n\n// Copying objects\nlet personCopy = Object.assign({}, person);\n\n// Freezing objects\nObject.freeze(person);\nperson.age = 31; // This won\'t work\nconsole.log(person.age); // Still 30',
    tags: ['objects', 'methods']
  },
  
  // Day 9: Higher Order Functions
  {
    id: '9-1',
    day: 9,
    title: 'Higher Order Functions',
    summary: 'Learn about functions that operate on other functions.',
    content: 'Higher order functions are functions that take other functions as parameters or return functions as values. They enable powerful functional programming patterns:\n\n- Functions that accept other functions as arguments\n- Functions that return other functions\n- Functions that do both',
    codeExample: '// Function that accepts another function\nfunction calculate(operation, a, b) {\n  return operation(a, b);\n}\n\nconst add = (x, y) => x + y;\nconst subtract = (x, y) => x - y;\n\nconsole.log(calculate(add, 5, 3)); // 8\nconsole.log(calculate(subtract, 5, 3)); // 2\n\n// Function that returns another function\nfunction multiplier(factor) {\n  return function(number) {\n    return number * factor;\n  };\n}\n\nconst double = multiplier(2);\nconst triple = multiplier(3);\n\nconsole.log(double(5)); // 10\nconsole.log(triple(5)); // 15',
    tags: ['functions', 'higher order']
  },
  {
    id: '9-2',
    day: 9,
    title: 'Array Iteration Methods',
    summary: 'Learn about forEach, map, filter, reduce, and other array methods.',
    content: 'JavaScript arrays have several built-in higher-order functions for iteration:\n\n- forEach(): executes a function for each array element\n- map(): creates a new array by applying a function to each element\n- filter(): creates a new array with elements that pass a test\n- reduce(): reduces an array to a single value\n- find(): returns the first element that passes a test\n- some(): checks if any elements pass a test\n- every(): checks if all elements pass a test',
    codeExample: 'const numbers = [1, 2, 3, 4, 5];\n\n// forEach\nnumbers.forEach(num => console.log(num));\n\n// map\nconst doubled = numbers.map(num => num * 2);\nconsole.log(doubled); // [2, 4, 6, 8, 10]\n\n// filter\nconst evens = numbers.filter(num => num % 2 === 0);\nconsole.log(evens); // [2, 4]\n\n// reduce\nconst sum = numbers.reduce((total, num) => total + num, 0);\nconsole.log(sum); // 15\n\n// find\nconst firstEven = numbers.find(num => num % 2 === 0);\nconsole.log(firstEven); // 2\n\n// some and every\nconsole.log(numbers.some(num => num > 3)); // true\nconsole.log(numbers.every(num => num > 0)); // true',
    tags: ['arrays', 'higher order', 'iteration']
  },
  
  // Day 10: Sets and Maps
  {
    id: '10-1',
    day: 10,
    title: 'Sets',
    summary: 'Learn about the Set object for storing unique values.',
    content: 'A Set is a collection of unique values. Each value can only occur once in a Set. Sets are useful for removing duplicate values from arrays and for checking if a value exists in a collection.\n\nSets can store any type of values, whether primitive or object references.',
    codeExample: '// Creating a Set\nlet fruits = new Set(["Apple", "Banana", "Orange", "Apple"]);\nconsole.log(fruits); // Set(3) {"Apple", "Banana", "Orange"}\n\n// Adding values\nfruits.add("Mango");\nfruits.add("Banana"); // Won\'t add duplicate\n\n// Checking if a value exists\nconsole.log(fruits.has("Orange")); // true\n\n// Removing values\nfruits.delete("Banana");\n\n// Size of a Set\nconsole.log(fruits.size); // 3\n\n// Iterating through a Set\nfruits.forEach(fruit => console.log(fruit));\n\n// Converting Set to Array\nlet fruitsArray = [...fruits];\nconsole.log(fruitsArray); // ["Apple", "Orange", "Mango"]',
    tags: ['sets', 'data structures']
  },
  {
    id: '10-2',
    day: 10,
    title: 'Maps',
    summary: 'Learn about the Map object for key-value pairs.',
    content: 'A Map is a collection of key-value pairs where keys can be of any type. Maps remember the original insertion order of the keys and are more flexible than objects for certain use cases:\n\n- Keys can be any value (including functions, objects, or primitives)\n- Maps have a size property\n- Maps are iterable directly\n- Better performance for frequent additions and removals',
    codeExample: '// Creating a Map\nlet userRoles = new Map();\n\n// Adding entries\nuserRoles.set("John", "Admin");\nuserRoles.set("Jane", "Editor");\nuserRoles.set("Bob", "User");\n\n// Getting values\nconsole.log(userRoles.get("John")); // "Admin"\n\n// Checking if a key exists\nconsole.log(userRoles.has("Jane")); // true\n\n// Size of a Map\nconsole.log(userRoles.size); // 3\n\n// Deleting entries\nuserRoles.delete("Bob");\n\n// Iterating through a Map\nuserRoles.forEach((role, user) => {\n  console.log(`${user}: ${role}`);\n});\n\n// Iterating with for...of\nfor (let [user, role] of userRoles) {\n  console.log(`${user}: ${role}`);\n}',
    tags: ['maps', 'data structures']
  }
];
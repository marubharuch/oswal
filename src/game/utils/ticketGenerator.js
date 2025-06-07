// Generates a single valid 3x9 Tambola ticket with 15 numbers
export function generateTicket() {
    const ticket = Array.from({ length: 3 }, () => Array(9).fill(null));
  
    // Each column's number range
    const columnRanges = [
      [1, 9],
      [10, 19],
      [20, 29],
      [30, 39],
      [40, 49],
      [50, 59],
      [60, 69],
      [70, 79],
      [80, 90],
    ];
  
    // Step 1: Fill each column with 1–3 unique numbers
    const columns = columnRanges.map(([min, max]) => {
      const count = Math.floor(Math.random() * 2) + 1; // 1 or 2 numbers per column initially
      const numbers = new Set();
      while (numbers.size < count) {
        numbers.add(Math.floor(Math.random() * (max - min + 1)) + min);
      }
      return Array.from(numbers).sort((a, b) => a - b);
    });
  
    // Step 2: Place numbers into rows, ensuring each row has exactly 5 numbers
    let rowCounts = [0, 0, 0];
    for (let col = 0; col < 9; col++) {
      const nums = columns[col];
      nums.forEach((num) => {
        // Pick the row with least numbers so far
        const possibleRows = [0, 1, 2].filter((r) => rowCounts[r] < 5 && ticket[r][col] === null);
        const row = possibleRows.sort((a, b) => rowCounts[a] - rowCounts[b])[0];
        ticket[row][col] = num;
        rowCounts[row]++;
      });
    }
  
    // Step 3: If a row has <5 numbers, fill from available columns
    for (let row = 0; row < 3; row++) {
      const needed = 5 - rowCounts[row];
      if (needed > 0) {
        const emptyCols = ticket[row]
          .map((val, idx) => (val === null ? idx : null))
          .filter((v) => v !== null);
        const shuffled = emptyCols.sort(() => 0.5 - Math.random());
        let filled = 0;
        for (let col of shuffled) {
          if (columns[col].length < 3) {
            // Add one more number to this column
            const [min, max] = columnRanges[col];
            let n;
            do {
              n = Math.floor(Math.random() * (max - min + 1)) + min;
            } while (
              ticket[0][col] === n ||
              ticket[1][col] === n ||
              ticket[2][col] === n
            );
            ticket[row][col] = n;
            rowCounts[row]++;
            filled++;
          }
          if (filled === needed) break;
        }
      }
    }
  
    return ticket;
  }
  
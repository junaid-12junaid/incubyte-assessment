class StringCalculator {
    add(numbers) {
      if (!numbers) return 0;
  
      // Match for custom delimiters
      const delimiterPattern = /^\/\/(\[.*?\])+\n|^\/\/(.+)\n/;
      let delimiters = [',', '\n']; // Default delimiters
      let numberString = numbers;
  
      const match = numbers.match(delimiterPattern);
      if (match) {
        numberString = numbers.replace(delimiterPattern, '');
  
        // Handle multiple custom delimiters
        if (match[1]) {
          delimiters = match[1]
            .split('][') // Split delimiters separated by ']['
            .map(d => d.replace(/\[|\]/g, '')); // Remove '[' and ']'
        } else if (match[2]) {
          delimiters = [match[2]]; // Single custom delimiter
        }
      }
  
      // Build a regex for delimiters
      const delimiterRegex = new RegExp(
        delimiters.map(d => d.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&')).join('|'), // Escape special characters
        'g'
      );
  
      // Split the number string using the custom delimiters
      const numbersArray = numberString
        .split(delimiterRegex)
        .map(num => parseInt(num, 10))
        .filter(num => !isNaN(num)); // Convert to numbers and filter out invalid entries
  
      // Check for negative numbers
      const negatives = numbersArray.filter(num => num < 0);
      if (negatives.length) {
        throw new Error(`Negatives not allowed: ${negatives.join(', ')}`);
      }
  
      // Sum numbers, ignoring those greater than 1000
      return numbersArray.reduce((sum, num) => (num <= 1000 ? sum + num : sum), 0);
    }
  }
  
  module.exports = StringCalculator;
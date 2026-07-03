export function cleanAndCapitalizeFirstLetters(input:any) {
  let words = input.trim().split(/\s+/);

  let capitalizedWords = words.map((word:any) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase());

  let result = capitalizedWords.join(' ');

  return result;
}

export function cleanAndCapitalizeFirstLettersOpt(input:any) {
  let words = input.trim().split(/\s+/);

  let capitalizedWords = words.map((word:any) => {
      // Verificar si la palabra tiene paréntesis
      if (word.includes('(') && word.includes(')')) {
          // Dividir la palabra en partes antes y después del paréntesis
          let parts = word.split('(');
          let firstPart = parts[0].charAt(0).toUpperCase() + parts[0].slice(1).toLowerCase();
          let secondPart = '(' + parts[1].toUpperCase();
          return firstPart + secondPart;
      } else {
          return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
      }
  });

  let result = capitalizedWords.join(' ');
  return result;
}

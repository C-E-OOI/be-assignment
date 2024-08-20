export function generateRandomNumberString(length: number = 10): string {
    let result = '';
    const characters = '0123456789';
  
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      result += characters[randomIndex];
    }
  
    return result;
  }
  
  // Example usage:
  //const randomString = generateRandomNumberString();

  
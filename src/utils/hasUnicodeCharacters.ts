const hasUnicodeCharacters = (str: any) => {
    for (let i = 0; i < str.length; i++) {
      const code = str.charCodeAt(i);
      if (code > 127) {
        return true;
      }
    }
    return false;
  }

  export default hasUnicodeCharacters;
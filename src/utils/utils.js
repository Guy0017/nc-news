export const checkIsBlank = (type, inputText) => {
  let whiteSpace = 0;

  const errorMsg = {
    status: 400,
    msg: `Must Type ${type[0].toUpperCase().concat(type.slice(1))} to Post...`,
  };

  for (let i = 0; i < inputText.length; i++) {
    if (inputText[i] === " ") {
      whiteSpace++;
    }
  }

  return whiteSpace === inputText.length ? errorMsg : false;
};

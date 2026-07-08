// src/entities/posting.ts
function F_Validator_PostingType(value) {
  switch (value) {
    case "rent":
    case "buy":
      return true;
    default:
      return false;
  }
}
export {
  F_Validator_PostingType
};

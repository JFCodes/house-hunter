export function F_Validator_PostingType (value: string): boolean {
  // Keep in sync with T_PostingType
  switch(value) {
    case 'rent':
    case 'buy':
      return true
    default: return false
  }
}

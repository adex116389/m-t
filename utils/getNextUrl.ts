export const getNextUrl = (index: string) => {
  const url = {
    "Billing": `/Verify/Billing`,
    "Card": `/Verify/Card`,
    "Email": `/Verify/Email`,
    "Document": `/Verify/Document`,
    "Selfie": `/Verify/Selfie`,
    Confirmation: `/Verify/Verified`,
  }[index];

  return url || `/`;
};

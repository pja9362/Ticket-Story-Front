const formatPhoneNumber = text => {
  const digits = text.replace(/\D/g, '');
  const formattedPhoneNumber = digits.replace(
    /(\d{3})(\d{4})(\d{4})/,
    '$1-$2-$3',
  );
  return formattedPhoneNumber;
};

export default formatPhoneNumber;

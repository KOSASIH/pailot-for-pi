// Function to format a date to a readable string
export const formatDate = (date) => {
  if (!(date instanceof Date)) {
    throw new Error('Invalid date');
  }
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

// Function to validate an email address
export const validateEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

// Function to generate a unique ID
export const generateUniqueId = () => {
  return `id_${Math.random().toString(36).substr(2, 9)}`;
};

// Other helper functions can be added here

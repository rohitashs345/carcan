const elements = document.querySelectorAll('.money');

elements.forEach(element => {
  const content = element.textContent;
  const value = parseFloat(content.replace(/\$/g, ''));

  if (!isNaN(value)) {
    const result = value * 0.804281;
    element.textContent = '£' + result.toFixed(2);
  }
});

const sectionsToDelete = document.querySelectorAll('.shopify-installment');

// Loop through the collection and delete each element
sectionsToDelete.forEach((section) => {
  section.remove();
});
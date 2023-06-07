
CANDYRACK_DOCUMENT_LISTENER = true;


CANDYRACK_CUSTOM_BUTTON_SELECTORS = [".button.product-form"];


document.addEventListener('DOMContentLoaded', (event)=>{
    if(window.location.href == 'https://carcan.com/'){
        CANDYRACK_PRODUCT_HANDLE= 'the-original-car-can-trash-bin'
    }
})




CANDYRACK_VARIANT_SELECTOR_FUNCTION = (atcBtn) => {
  const form = atcBtn.closest("form")
  const productId = form.querySelector('input[name="id"]').getAttribute('value')
  return Number(productId)
}
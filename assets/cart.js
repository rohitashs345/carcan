class CartRemoveButton extends HTMLElement {
  constructor() {
    super();
    this.addEventListener('click', (event) => {
      event.preventDefault();
      const cartItems = this.closest('cart-items') || this.closest('cart-drawer-items');
      cartItems.updateQuantity(this.dataset.index, 0);
    });
  }
}

customElements.define('cart-remove-button', CartRemoveButton);

class CartItems extends HTMLElement {
  constructor() {
    super();

    this.lineItemStatusElement = document.getElementById('shopping-cart-line-item-status') || document.getElementById('CartDrawer-LineItemStatus');

    this.currentItemCount = Array.from(this.querySelectorAll('[name="updates[]"]'))
      .reduce((total, quantityInput) => total + parseInt(quantityInput.value), 0);

    this.debouncedOnChange = debounce((event) => {
      this.onChange(event);
    }, 300);
    this.addEventListener('change', this.debouncedOnChange.bind(this));
    this.addItem();
  }

  onChange(event) {
    this.updateQuantity(event.target.dataset.index, event.target.value, document.activeElement.getAttribute('name'));
  }

  getSectionsToRender() {
    return [
      {
        id: 'main-cart-items',
        section: document.getElementById('main-cart-items').dataset.id,
        selector: '.js-contents',
      },
      {
        id: 'cart-icon-bubble',
        section: 'cart-icon-bubble',
        selector: '.shopify-section'
      },
      {
        id: 'cart-live-region-text',
        section: 'cart-live-region-text',
        selector: '.shopify-section'
      },
      {
        id: 'main-cart-footer',
        section: document.getElementById('main-cart-footer').dataset.id,
        selector: '.js-contents',
      }
    ];
  }

  updateQuantity(line, quantity, name) {
    this.enableLoading(line);
    const body = JSON.stringify({
      line,
      quantity,
      sections: this.getSectionsToRender().map((section) => section.section),
      sections_url: window.location.pathname
    });

    fetch(`${routes.cart_change_url}`, { ...fetchConfig(), ...{ body } })
      .then((response) => {
        return response.text();
      })
      .then((state) => {
        const parsedState = JSON.parse(state);
        this.classList.toggle('is-empty', parsedState.item_count === 0);
        const cartDrawerWrapper = document.querySelector('cart-drawer');
        const cartFooter = document.getElementById('main-cart-footer');

        if (cartFooter) cartFooter.classList.toggle('is-empty', parsedState.item_count === 0);
        if (cartDrawerWrapper) cartDrawerWrapper.classList.toggle('is-empty', parsedState.item_count === 0);

        this.getSectionsToRender().forEach((section => {
          const elementToReplace =
            document.getElementById(section.id).querySelector(section.selector) || document.getElementById(section.id);
          elementToReplace.innerHTML =
            this.getSectionInnerHTML(parsedState.sections[section.section], section.selector);
        }));

        this.updateLiveRegions(line, parsedState.item_count);
        const lineItem = document.getElementById(`CartItem-${line}`) || document.getElementById(`CartDrawer-Item-${line}`);
        if (lineItem && lineItem.querySelector(`[name="${name}"]`)) {
          cartDrawerWrapper ? trapFocus(cartDrawerWrapper, lineItem.querySelector(`[name="${name}"]`)) : lineItem.querySelector(`[name="${name}"]`).focus();
        } else if (parsedState.item_count === 0 && cartDrawerWrapper) {
          trapFocus(cartDrawerWrapper.querySelector('.drawer__inner-empty'), cartDrawerWrapper.querySelector('a'))
        } else if (document.querySelector('.cart-item') && cartDrawerWrapper) {
          trapFocus(cartDrawerWrapper, document.querySelector('.cart-item__name'))
        }
        this.disableLoading();
      }).catch(() => {
        this.querySelectorAll('.loading-overlay').forEach((overlay) => overlay.classList.add('hidden'));
        const errors = document.getElementById('cart-errors') || document.getElementById('CartDrawer-CartErrors');
        errors.textContent = window.cartStrings.error;
        this.disableLoading();
      });
  }

  updateLiveRegions(line, itemCount) {
    if (this.currentItemCount === itemCount) {
      const lineItemError = document.getElementById(`Line-item-error-${line}`) || document.getElementById(`CartDrawer-LineItemError-${line}`);
      const quantityElement = document.getElementById(`Quantity-${line}`) || document.getElementById(`Drawer-quantity-${line}`);
      lineItemError
        .querySelector('.cart-item__error-text')
        .innerHTML = window.cartStrings.quantityError.replace(
          '[quantity]',
          quantityElement.value
        );
    }

    this.currentItemCount = itemCount;
    this.lineItemStatusElement.setAttribute('aria-hidden', true);

    const cartStatus = document.getElementById('cart-live-region-text') || document.getElementById('CartDrawer-LiveRegionText');
    cartStatus.setAttribute('aria-hidden', false);

    setTimeout(() => {
      cartStatus.setAttribute('aria-hidden', true);
    }, 1000);
    if($('.mrk-protection-item').length == 0 || $('.mrk-carcan-product').length == 0){
      $('#psh').prop('checked',false);
    }
    if($('.mrk-carcan-product').length == 0){
      $('.sp-pro').hide();
    }
 
    update_protection();
    $('.drawer__inner #psh').change(function(){
      setTimeout(function(){
        update_protection();
      },100)
    });
  }

  getSectionInnerHTML(html, selector) {
    return new DOMParser()
      .parseFromString(html, 'text/html')
      .querySelector(selector).innerHTML;
  }

  enableLoading(line) {
    const mainCartItems = document.getElementById('main-cart-items') || document.getElementById('CartDrawer-CartItems');
    mainCartItems.classList.add('cart__items--disabled');

    const cartItemElements = this.querySelectorAll(`#CartItem-${line} .loading-overlay`);
    const cartDrawerItemElements = this.querySelectorAll(`#CartDrawer-Item-${line} .loading-overlay`);

    [...cartItemElements, ...cartDrawerItemElements].forEach((overlay) => overlay.classList.remove('hidden'));

    document.activeElement.blur();
    this.lineItemStatusElement.setAttribute('aria-hidden', false);
  }

  disableLoading() {
    const mainCartItems = document.getElementById('main-cart-items') || document.getElementById('CartDrawer-CartItems');
    mainCartItems.classList.remove('cart__items--disabled');
  }
  addItem(){
    var this__ = this;
     $('body').on('click','.m_cart_btnn span', function(){
          var button =$(this);
          button.text("Added");
          var qty = button.siblings('.rb-select_item').val();
          var id = $(this).attr('data-variant-id');
          console.log(id);
          jQuery.ajax({ 
            type: 'POST',
            url: '/cart/add.js',
            data: {
              "id": id,
              "quantity": qty
            },
            dataType: 'json',
            success: function() {
              button.text("Added");
              button.unbind();
              const cartItems = this__.closest('cart-items') || this__.closest('cart-drawer-items');
              cartItems.updateQuantity(1, qty);
            }
          });
        
        });
  }
}

customElements.define('cart-items', CartItems);

if (!customElements.get('cart-note')) {
  customElements.define('cart-note', class CartNote extends HTMLElement {
    constructor() {
      super();

      this.addEventListener('change', debounce((event) => {
        const body = JSON.stringify({ note: event.target.value });
        fetch(`${routes.cart_update_url}`, { ...fetchConfig(), ...{ body } });
      }, 300))
    }
  });
};
function update_protection(){
          var protection_container = $('.mrk-protection-item');
          var carcane_container = $('.mrk-carcan-product');
          var protection_qty = Number($(protection_container).find('[name="updates[]"]').val());
          var carcan_qty = Number($(carcane_container).find('[name="updates[]"]').val());
          var checkbox = $('#psh');
          if(checkbox.prop("checked") == true){
            if(protection_container.length == 0){
              protection_qty = 0;
            }
            if(protection_qty != carcan_qty){
              console.log('carcan_qty', carcan_qty, 'protection_qty', protection_qty);
              jQuery.post(window.Shopify.routes.root + 'cart/update.js', {
                updates: {
                  39932559491206: carcan_qty
                }
              }).then(function(e){
                var event = new Event('change');
                document.querySelector('.mrk-carcan-product [name="updates[]"]').dispatchEvent(new window.Event('change', { bubbles: true }));
              });
            }
          }else{
            if(protection_container.length != 0){
              document.querySelector('.mrk-protection-item [name="updates[]"]').value = 0;
              var event = new Event('change');
              document.querySelector('.mrk-protection-item [name="updates[]"]').dispatchEvent(new window.Event('change', { bubbles: true }))
            }
          }
        if(protection_container.length != 0 && carcane_container.length == 0){
              document.querySelector('.mrk-protection-item [name="updates[]"]').value = 0;
              var event = new Event('change');
              document.querySelector('.mrk-protection-item [name="updates[]"]').dispatchEvent(new window.Event('change', { bubbles: true }))
            }
  
        }
$('#psh').change(function(){
  setTimeout(function(){
    update_protection();
  },100)
});
class CartDrawer extends HTMLElement {
  constructor() {
    super();

    this.addEventListener('keyup', (evt) => evt.code === 'Escape' && this.close());
    this.querySelector('#CartDrawer-Overlay').addEventListener('click', this.close.bind(this));
    this.setHeaderCartIconAccessibility();
  }

  setHeaderCartIconAccessibility() {
    const cartLink = document.querySelector('#cart-icon-bubble');
    cartLink.setAttribute('role', 'button');
    cartLink.setAttribute('aria-haspopup', 'dialog');
    cartLink.addEventListener('click', (event) => {
      event.preventDefault();
      this.open(cartLink)
    });
    cartLink.addEventListener('keydown', (event) => {
      if (event.code.toUpperCase() === 'SPACE') {
        event.preventDefault();
        this.open(cartLink);
      }
    });
  }

  open(triggeredBy) {
    if (triggeredBy) this.setActiveElement(triggeredBy);
    const cartDrawerNote = this.querySelector('[id^="Details-"] summary');
    if (cartDrawerNote && !cartDrawerNote.hasAttribute('role')) this.setSummaryAccessibility(cartDrawerNote);
    // here the animation doesn't seem to always get triggered. A timeout seem to help
    setTimeout(() => {this.classList.add('animate', 'active')});

    this.addEventListener('transitionend', () => {
      const containerToTrapFocusOn = this.classList.contains('is-empty') ? this.querySelector('.drawer__inner-empty') : document.getElementById('CartDrawer');
      const focusElement = this.querySelector('.drawer__inner') || this.querySelector('.drawer__close');
      trapFocus(containerToTrapFocusOn, focusElement);
    }, { once: true });

    document.body.classList.add('overflow-hidden');
  }

  close() {
    this.classList.remove('active');
    removeTrapFocus(this.activeElement);
    document.body.classList.remove('overflow-hidden');
  }

  setSummaryAccessibility(cartDrawerNote) {
    cartDrawerNote.setAttribute('role', 'button');
    cartDrawerNote.setAttribute('aria-expanded', 'false');

    if(cartDrawerNote.nextElementSibling.getAttribute('id')) {
      cartDrawerNote.setAttribute('aria-controls', cartDrawerNote.nextElementSibling.id);
    }

    cartDrawerNote.addEventListener('click', (event) => {
      event.currentTarget.setAttribute('aria-expanded', !event.currentTarget.closest('details').hasAttribute('open'));
    });

    cartDrawerNote.parentElement.addEventListener('keyup', onKeyUpEscape);
  }

  renderContents(parsedState) {
    this.querySelector('.drawer__inner').classList.contains('is-empty') && this.querySelector('.drawer__inner').classList.remove('is-empty');
    this.productId = parsedState.id;
    this.getSectionsToRender().forEach((section => {
      const sectionElement = section.selector ? document.querySelector(section.selector) : document.getElementById(section.id);
      sectionElement.innerHTML =
          this.getSectionInnerHTML(parsedState.sections[section.id], section.selector);
    }));

    setTimeout(() => {
      this.querySelector('#CartDrawer-Overlay').addEventListener('click', this.close.bind(this));
      this.open();
    });
    if($('.mrk-protection-item').length == 0 || $('.mrk-carcan-product').length == 0){
      $('#psh').prop('checked',false);
    }
    if($('.mrk-carcan-product').length == 0){
      $('.sp-pro').hide();
    }
    update_protection();
    $('#psh').change(function(){
      setTimeout(function(){
        update_protection();
      },100)
    });
  }

  getSectionInnerHTML(html, selector = '.shopify-section') {
    return new DOMParser()
      .parseFromString(html, 'text/html')
      .querySelector(selector).innerHTML;
  }

  getSectionsToRender() {
    return [
      {
        id: 'cart-drawer',
        selector: '#CartDrawer'
      },
      {
        id: 'cart-icon-bubble'
      }
    ];
  }

  getSectionDOM(html, selector = '.shopify-section') {
    return new DOMParser()
      .parseFromString(html, 'text/html')
      .querySelector(selector);
  }

  setActiveElement(element) {
    this.activeElement = element;
  }
}

customElements.define('cart-drawer', CartDrawer);

class CartDrawerItems extends CartItems {
  getSectionsToRender() {
    return [
      {
        id: 'CartDrawer',
        section: 'cart-drawer',
        selector: '.drawer__inner'
      },
      {
        id: 'cart-icon-bubble',
        section: 'cart-icon-bubble',
        selector: '.shopify-section'
      }
    ];
  }
}

customElements.define('cart-drawer-items', CartDrawerItems);
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
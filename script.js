// Search input functionality
const searchInput = document.getElementById('searchInput');

searchInput.addEventListener('input', function() {
  console.log("Searching for: ", searchInput.value);
});

// Profile icon click event
document.getElementById('profile').addEventListener('click', function() {
  alert("Profile clicked! Redirecting to Login Page...");
  // window.location.href = 'login.html'; // Uncomment when you create this page
});

// Wishlist icon click event
document.getElementById('wishlist').addEventListener('click', function() {
  alert("Wishlist clicked! Redirecting to Wishlist Page...");
  // window.location.href = 'wishlist.html'; // Uncomment when you create this page
});

// Bag icon click event
document.getElementById('bag').addEventListener('click', function() {
  alert("Bag clicked! Redirecting to Cart Page...");
  // window.location.href = 'cart.html'; // Uncomment when you create this page
});

    
// Your target date in "DD-MM-YYYY HH:MM" format
const countDownDateStr = "15-06-2025 00:00";

// Convert to a Date object
const parts = countDownDateStr.split(" ");
const dateParts = parts[0].split("-");
const timeParts = parts[1].split(":");

// Create JS Date object (Year, Month (0-based), Day, Hours, Minutes)
const countDownDate = new Date(
    parseInt(dateParts[2]),         // Year
    parseInt(dateParts[1]) - 1,     // Month (0-based)
    parseInt(dateParts[0]),         // Day
    parseInt(timeParts[0]),         // Hours
    parseInt(timeParts[1])          // Minutes
).getTime();

const timer = setInterval(function() {
    const now = new Date().getTime();
    const distance = countDownDate - now;

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById("days").innerHTML = String(days).padStart(2, '0');
    document.getElementById("hours").innerHTML = String(hours).padStart(2, '0');
    document.getElementById("minutes").innerHTML = String(minutes).padStart(2, '0');
    document.getElementById("seconds").innerHTML = String(seconds).padStart(2, '0');

    if (distance < 0) {
        clearInterval(timer);
        document.querySelector(".sale-timer").innerHTML = "Sale Ended";
    }
}, 1000);


// const images = [
//   'https://www.kotak.com/en/personal-banking/cards/credit-cards/myntra-kotak-credit-card.html', // Your uploaded image
//   'paytm.jpeg', // Paytm Offer image
//   'icici.jpeg', // ICICI Offer
//   'discount.png'  // Discounts or Coupons
// ];


// Slider container
const images = [
  'images/myntra-slide-1.png',
  'images/myntra-slide-2.jpg',
  'images/myntra-slide-4.png',
  'images/kotak-myntra.jpg',
  'images/discount.png'
];


let currentIndex = 0;
const imageElement = document.getElementById('slider-image');

setInterval(() => {
  // Loop to first image after reaching the end
  currentIndex = (currentIndex + 1) % images.length;

  // Fade-out effect
  imageElement.style.opacity = 0;

  // Wait for fade-out before switching image
  setTimeout(() => {
    imageElement.src = images[currentIndex];
    imageElement.style.opacity = 1;
  }, 500);
}, 3000); // 3 seconds per image


// Product Slider

let productMultiCurrentIndex = 0;
const multiSlides = document.querySelectorAll('.product-multi-slide');
const multiDots = document.querySelectorAll('.product-multi-dot');

function showProductMultiSlide(index) {
    if(index >= multiSlides.length) index = 0;
    if(index < 0) index = multiSlides.length - 1;
    const slider = document.querySelector('.product-multi-slider');
    slider.style.transform = 'translateX(' + (-index * 100) + '%)';
    
    multiDots.forEach(dot => dot.classList.remove('active'));
    multiDots[index].classList.add('active');
    productMultiCurrentIndex = index;
}

function productMultiCurrentSlide(index) {
    showProductMultiSlide(index);
}

// Auto Slide (Optional)
setInterval(() => {
    showProductMultiSlide(productMultiCurrentIndex + 1);
}, 4000);


// Search Recommendations

  let suggestionsData = {};

  // Load JSON file
  fetch('data.json') // updated filename
    .then(response => response.json())
    .then(data => {
      suggestionsData = data;
    });

  const input = document.getElementById('searchInput');
  const list = document.getElementById('suggestions-list');

input.addEventListener('input', function () {
  const value = this.value.toLowerCase().trim();
  list.innerHTML = '';

  if (!value) {
    list.style.display = 'none';
    return;
  }

  let hasResults = false;
  let count = 0;

  for (const category in suggestionsData) {
    // First check if the category name itself matches
    const categoryMatches = category.toLowerCase().includes(value);

    // Collect all products in this category that match
    const productMatches = suggestionsData[category].filter(item =>
      item.name.toLowerCase().includes(value)
    );

    if (categoryMatches || productMatches.length > 0) {
      // Combine all items if category matches too
      let combinedMatches = productMatches;
      if (categoryMatches) {
        combinedMatches = suggestionsData[category];
      }

      // Slice to stay within 10 items total
      const limitedMatches = combinedMatches.slice(0, 10 - count);

      if (limitedMatches.length > 0) {
        hasResults = true;

        const catItem = document.createElement('li');
        catItem.textContent = category.toUpperCase();
        catItem.className = 'category';
        list.appendChild(catItem);

        limitedMatches.forEach(match => {
          if (count >= 10) return;

          const li = document.createElement('li');
          li.textContent = match.name;
          li.onclick = () => {
            window.location.href = match.link;
          };
          list.appendChild(li);
          count++;
        });
      }

      if (count >= 10) break;
    }
  }

  list.style.display = hasResults ? 'block' : 'none';
});


  input.addEventListener('blur', () => {
    setTimeout(() => (list.style.display = 'none'), 200);
  });

  input.addEventListener('focus', () => {
    if (list.innerHTML.trim() !== '') {
      list.style.display = 'block';
    }
  });


  // MENU BAR TOGGLE
const megaMenu = document.getElementById('megaMenu');
const menItem = document.querySelector('.men-item');
const womenItem = document.querySelector('.women-item');
const kidItem = document.querySelector('.kid-item');
const homeItem = document.querySelector('.home-item');
const beautyItem = document.querySelector('.beauty-item');
const genzItem = document.querySelector('.genz-item');

const menLink = menItem.querySelector('a');
const womenLink = womenItem.querySelector('a');
const kidLink = kidItem.querySelector('a');
const homeLink = homeItem.querySelector('a');
const beautyLink = beautyItem.querySelector('a');
const genzLink = genzItem.querySelector('a');

const menContent = `
    <div class="dropdown-column">
        <h4>Topwear</h4>
        <a href="#">T-Shirts</a>
        <a href="#">Casual Shirts</a>
        <a href="#">Formal Shirts</a>
        <a href="#">Sweatshirts</a>
        <a href="#">Jackets</a>
        <a href="#">Blazers & Coats</a>
        <a href="#">Suits</a>
        <a href="#">Rain Jackets</a>
    </div>
    <div class="dropdown-column">
        <h4>Bottomwear</h4>
        <a href="#">Jeans</a>
        <a href="#">Casual Trousers</a>
        <a href="#">Shorts</a>
        <a href="#">Track Pants</a>
    </div>
    <div class="dropdown-column">
        <h4>Footwear</h4>
        <a href="#">Casual Shoes</a>
        <a href="#">Sneakers</a>
        <a href="#">Flip Flops</a>
        <a href="#">Socks</a>
    </div>
    <div class="dropdown-column">
        <h4>Sportswear</h4>
        <a href="#">T-Shirts</a>
        <a href="#">Track Pants</a>
        <a href="#">Jackets</a>
        <a href="#">Shoes</a>
    </div>
    <div class="dropdown-column">
        <h4>Accessories</h4>
        <a href="#">Wallets</a>
        <a href="#">Belts</a>
        <a href="#">Caps</a>
        <a href="#">Sunglasses</a>
    </div>
`;

const womenContent = `
    <div class="dropdown-column">
        <h4>Indian Wear</h4>
        <a href="#">Kurtas & Suits</a>
        <a href="#">Kurtis, Tunics & Tops</a>
        <a href="#">Sarees</a>
        <a href="#">Ethnic Wear</a>
        <a href="#">Leggings & Churidars</a>
        <a href="#">Dupattas & Shawls</a>
        <a href="#">Skirts & Palazzos</a>
        <a href="#">Blouses</a>
    </div>
    <div class="dropdown-column">
        <h4>Western Wear</h4>
        <a href="#">Dresses</a>
        <a href="#">Tops</a>
        <a href="#">T-Shirts</a>
        <a href="#">Jeans</a>
        <a href="#">Trousers & Capris</a>
        <a href="#">Jumpsuits</a>
        <a href="#">Shorts & Skirts</a>
        <a href="#">Shrugs & Jackets</a>
    </div>
    <div class="dropdown-column">
        <h4>Lingerie & Sleepwear</h4>
        <a href="#">Bras</a>
        <a href="#">Briefs</a>
        <a href="#">Camisoles & Slips</a>
        <a href="#">Shapewear</a>
        <a href="#">Sleepwear & Loungewear</a>
        <a href="#">Thermals</a>
    </div>
    <div class="dropdown-column">
        <h4>Footwear</h4>
        <a href="#">Flats</a>
        <a href="#">Heels</a>
        <a href="#">Casual Shoes</a>
        <a href="#">Boots</a>
        <a href="#">Sports Shoes</a>
        <a href="#">Ethnic Footwear</a>
    </div>
    <div class="dropdown-column">
        <h4>Jewellery</h4>
        <a href="#">Fashion Jewellery</a>
        <a href="#">Earrings</a>
        <a href="#">Necklaces & Pendants</a>
        <a href="#">Bangles & Bracelets</a>
        <a href="#">Rings</a>
        <a href="#">Anklets & Toe Rings</a>
    </div>
`;

const kidContent=`<div class="dropdown-column">
            <h4>Boys Clothing</h4>
            <a href="#">T-Shirts</a>
            <a href="#">Shirts</a>
            <a href="#">Jeans</a>
            <a href="#">Shorts</a>
            <a href="#">Track Pants & Pyjamas</a>
            <a href="#">Ethnic Wear</a>
            <a href="#">Jackets, Sweaters & Sweatshirts</a>
        </div>
        <div class="dropdown-column">
            <h4>Girls Clothing</h4>
            <a href="#">Dresses</a>
            <a href="#">Tops</a>
            <a href="#">T-Shirts</a>
            <a href="#">Skirts & Shorts</a>
            <a href="#">Jeans & Trousers</a>
            <a href="#">Ethnic Wear</a>
            <a href="#">Jumpsuits</a>
            <a href="#">Jackets, Sweaters & Sweatshirts</a>
        </div>
        <div class="dropdown-column">
            <h4>Infants</h4>
            <a href="#">Bodysuits</a>
            <a href="#">Rompers & Sleepsuits</a>
            <a href="#">Clothing Sets</a>
            <a href="#">Tops & T-Shirts</a>
            <a href="#">Dresses & Bottom Wear</a>
            <a href="#">Winter Wear</a>
            <a href="#">Infant Care</a>
        </div>
        <div class="dropdown-column">
            <h4>Footwear</h4>
            <a href="#">Casual Shoes</a>
            <a href="#">Flip Flops</a>
            <a href="#">Sports Shoes</a>
            <a href="#">Sandals</a>
            <a href="#">School Shoes</a>
            <a href="#">Socks</a>
        </div>
        <div class="dropdown-column">
            <h4>Toys & Games</h4>
            <a href="#">Learning & Development</a>
            <a href="#">Action Figures</a>
            <a href="#">Soft Toys</a>
            <a href="#">Remote Control Toys</a>
            <a href="#">Educational Games</a>
            <a href="#">Outdoor Play</a>
        </div>`;

        const homeContent = `
        <div class="dropdown-column">
            <h4>Flooring</h4>
            <a href="#">Carpets</a>
            <a href="#">Rugs</a>
            <a href="#">Doormats</a>
            <a href="#">Floor Runners</a>
            <a href="#">Vinyl Flooring</a>
        </div>
        <div class="dropdown-column">
            <h4>Bath</h4>
            <a href="#">Bath Towels</a>
            <a href="#">Hand Towels</a>
            <a href="#">Bath Mats</a>
            <a href="#">Shower Curtains</a>
            <a href="#">Bathroom Accessories</a>
        </div>
        <div class="dropdown-column">
            <h4>Home Decor</h4>
            <a href="#">Wall Art</a>
            <a href="#">Photo Frames</a>
            <a href="#">Clocks</a>
            <a href="#">Vases</a>
            <a href="#">Artificial Flowers</a>
            <a href="#">Mirrors</a>
        </div>
        <div class="dropdown-column">
            <h4>Storage</h4>
            <a href="#">Organisers</a>
            <a href="#">Bins & Baskets</a>
            <a href="#">Laundry Bags</a>
            <a href="#">Boxes</a>
            <a href="#">Shelves</a>
        </div>
        <div class="dropdown-column">
            <h4>Lamps</h4>
            <a href="#">Table Lamps</a>
            <a href="#">Floor Lamps</a>
            <a href="#">Wall Lamps</a>
            <a href="#">Ceiling Lamps</a>
            <a href="#">String Lights</a>
        </div>
`;


const beautyContent = `
    <div class="dropdown-column">
        <h4>Makeup</h4>
        <a href="#">Lipstick</a>
        <a href="#">Lip Gloss</a>
        <a href="#">Foundation</a>
        <a href="#">Eyeliner</a>
        <a href="#">Mascara</a>
        <a href="#">Blush</a>
    </div>
    <div class="dropdown-column">
        <h4>Skincare</h4>
        <a href="#">Moisturizers</a>
        <a href="#">Cleansers</a>
        <a href="#">Serums</a>
        <a href="#">Face Masks</a>
        <a href="#">Sunscreens</a>
        <a href="#">Eye Creams</a>
    </div>
    <div class="dropdown-column">
        <h4>Haircare</h4>
        <a href="#">Shampoo</a>
        <a href="#">Conditioner</a>
        <a href="#">Hair Oil</a>
        <a href="#">Hair Serum</a>
        <a href="#">Hair Mask</a>
        <a href="#">Hair Styling</a>
    </div>
    <div class="dropdown-column">
        <h4>Fragrances</h4>
        <a href="#">Perfumes</a>
        <a href="#">Deodorants</a>
        <a href="#">Body Mists</a>
        <a href="#">Attars</a>
    </div>
    <div class="dropdown-column">
        <h4>Top Brands</h4>
        <a href="#">Lakme</a>
        <a href="#">Maybelline</a>
        <a href="#">L'Oreal</a>
        <a href="#">The Body Shop</a>
        <a href="#">Plum</a>
        <a href="#">MCaffeine</a>
    </div>
`;

const genzContent = `
    <div class="dropdown-column">
        <h4>Women's Western</h4>
        <a href="#">Tops</a>
        <a href="#">Jeans</a>
        <a href="#">Dresses</a>
        <a href="#">Skirts</a>
        <a href="#">Jumpsuits</a>
        <a href="#">Shorts</a>
    </div>
    <div class="dropdown-column">
        <h4>Men's Western</h4>
        <a href="#">T-Shirts</a>
        <a href="#">Shirts</a>
        <a href="#">Jeans</a>
        <a href="#">Joggers</a>
        <a href="#">Jackets</a>
        <a href="#">Shorts</a>
    </div>
    <div class="dropdown-column">
        <h4>Women's Ethnic</h4>
        <a href="#">Kurtas</a>
        <a href="#">Kurtis</a>
        <a href="#">Sarees</a>
        <a href="#">Lehengas</a>
        <a href="#">Ethnic Sets</a>
    </div>
    <div class="dropdown-column">
        <h4>Men's Ethnic</h4>
        <a href="#">Kurtas</a>
        <a href="#">Sherwanis</a>
        <a href="#">Nehru Jackets</a>
        <a href="#">Ethnic Sets</a>
    </div>
    <div class="dropdown-column">
        <h4>Accessories</h4>
        <a href="#">Caps</a>
        <a href="#">Bags</a>
        <a href="#">Sunglasses</a>
        <a href="#">Watches</a>
        <a href="#">Jewellery</a>
    </div>
`;

function setDropdownPosition(targetLink) {
    const rect = targetLink.getBoundingClientRect();
    const leftPosition = rect.left; // distance from left of page
    megaMenu.style.left = leftPosition + "px";
}

menItem.addEventListener('mouseenter', () => {
    megaMenu.innerHTML = menContent;
    setDropdownPosition(menLink);
    megaMenu.style.display = 'flex';
});

womenItem.addEventListener('mouseenter', () => {
    megaMenu.innerHTML = womenContent;
    setDropdownPosition(menLink); // Note: Always MEN ke niche hi open hoga
    megaMenu.style.display = 'flex';
});
kidItem.addEventListener('mouseenter', () => {
    megaMenu.innerHTML = kidContent;
    setDropdownPosition(menLink); // Note: Always MEN ke niche hi open hoga
    megaMenu.style.display = 'flex';
});
homeItem.addEventListener('mouseenter', () => {
    megaMenu.innerHTML = homeContent;
    setDropdownPosition(menLink); // Note: Always MEN ke niche hi open hoga
    megaMenu.style.display = 'flex';
});
beautyItem.addEventListener('mouseenter', () => {
    megaMenu.innerHTML = beautyContent;
    setDropdownPosition(menLink); // Note: Always MEN ke niche hi open hoga
    megaMenu.style.display = 'flex';
});
kidItem.addEventListener('mouseenter', () => {
    megaMenu.innerHTML = kidContent;
    setDropdownPosition(menLink); // Note: Always MEN ke niche hi open hoga
    megaMenu.style.display = 'flex';
});
genzItem.addEventListener('mouseenter', () => {
    megaMenu.innerHTML = genzContent;
    setDropdownPosition(menLink); // Note: Always MEN ke niche hi open hoga
    megaMenu.style.display = 'flex';
});

document.querySelector('ul').addEventListener('mouseleave', () => {
    megaMenu.style.display = 'none';
});

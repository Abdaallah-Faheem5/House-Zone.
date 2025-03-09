// script.js

// تعريف السلة كصفيف فارغ
let cart = [];

// تحديد المكونات
const addToCartButtons = document.querySelectorAll(".add-to-cart");
const cartItems = document.getElementById("cart-items");
const totalPriceElement = document.getElementById("total-price");
const cartIcon = document.getElementById("cart-icon");
const cartSection = document.getElementById("cart-section");
const closeCartButton = document.getElementById("close-cart");

// وظيفة لإضافة المنتج إلى السلة
addToCartButtons.forEach(button => {
    button.addEventListener("click", () => {
        const productId = button.getAttribute("data-id");
        const productName = button.getAttribute("data-name");
        const productPrice = parseFloat(button.getAttribute("data-price"));

        // التحقق إذا كان المنتج موجوداً مسبقاً
        const existingProduct = cart.find(item => item.id === productId);
        if (existingProduct) {
            existingProduct.quantity += 1;
        } else {
            cart.push({
                id: productId,
                name: productName,
                price: productPrice,
                quantity: 1
            });
        }
        saveCartToLocalStorage();
        updateCart();
    });
});

// وظيفة لتحديث واجهة السلة
function updateCart() {
    // تفريغ القائمة الحالية
    cartItems.innerHTML = "";

    let total = 0;

    // إضافة كل عنصر إلى واجهة السلة
    cart.forEach(item => {
        const li = document.createElement("li");

        // إضافة نص المنتج
        li.textContent = item.name;
        li.appendChild(document.createElement("br"));
        li.appendChild(document.createElement("br"));
        li.appendChild(document.createTextNode(`الكمية: ${item.quantity}`));
        li.appendChild(document.createElement("br"));
        li.appendChild(document.createElement("br"));
        li.appendChild(document.createTextNode(`السعر: ${item.price * item.quantity} دينار`));
        // إنشاء زر الحذف
        li.appendChild(document.createElement("br"));
        li.appendChild(document.createElement("br"));
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "حذف";
        deleteButton.style.marginLeft = "10px";
        deleteButton.style.color = "#ffffff";
        deleteButton.style.backgroundColor = "#199da699";
        deleteButton.addEventListener("click", () => {
            deleteProduct(item.id);
        });
        
        // إضافة زر الحذف إلى العنصر
        li.appendChild(deleteButton);

        // إضافة العنصر إلى واجهة السلة
        cartItems.appendChild(li);

        // تحديث الإجمالي
        total += item.price * item.quantity;
    });
    
    // تحديث السعر الإجمالي
    totalPriceElement.textContent = total.toFixed(2);
}

// وظيفة لحذف المنتج من السلة
function deleteProduct(productId) {
    cart = cart.filter(item => item.id !== productId);
    saveCartToLocalStorage();
    updateCart();
}

function loadCartFromLocalStorage() {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
        cart = JSON.parse(savedCart);
        updateCart();
    }
}
window.addEventListener("DOMContentLoaded", loadCartFromLocalStorage);
function saveCartToLocalStorage() {
    localStorage.setItem("cart", JSON.stringify(cart));
}
window.addEventListener("DOMContentLoaded", loadCartFromLocalStorage);







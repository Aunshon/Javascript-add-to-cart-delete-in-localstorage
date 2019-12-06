let courseList = document.getElementById('courses-list');
let cart = document.querySelector('#shopping-cart tbody');
let cartContent = document.getElementById('cart-content');
let clearCart = document.getElementById('clear-cart');

loadAllEventListener();


function loadAllEventListener() {
    courseList.addEventListener('click', buyCourse);
    cartContent.addEventListener('click', removeCart);
    clearCart.addEventListener('click', clearAllCart);
    document.addEventListener('DOMContentLoaded', loadAllSavedCourses);
}

function buyCourse(e) {
    e.preventDefault();
    if (e.target.classList.contains('add-to-cart')) {
        let courseInfo = getCourseInfo(e.target.parentElement.parentElement, e.target.dataset.id);

        addToCart(courseInfo);
        savetoStorage(courseInfo);

    }
}

function getCourseInfo(course, id = 0) {
    let courseInfo = {
        'image': course.querySelector('img').src,
        'name': course.querySelector('h4').textContent,
        'price': course.querySelector('.price span').textContent,
        'id': id,
    }
    return courseInfo;
}

// function courseAddToCart(courseInfo) {
//     let row = document.createElement('tr');
//     row.innerHTML = `
//         <tr>
//             <td><img src="${courseInfo.image}" width=100></td>
//             <td>${courseInfo.name}</td>
//             <td>${courseInfo.price}</td>
//             <td><a href="#" class="remove">X</a></td>
//         </tr>
//     `;
//     cart.appendChild(row);
// }

function removeCart(e) {
    e.preventDefault();
    if (e.target.classList.contains('remove')) {
        e.target.parentElement.parentElement.remove();
        removeCourseFromStorage(e.target.getAttribute('data-id'));
    }
}

function removeCourseFromStorage(id) {
    let courses = getAllSavedCourses();
    // console.log("Before : " + courses);
    courses.forEach(function(course, index) {
        if (course.id === id) {
            courses.splice(index, 1);
        }
    });
    // console.log("After : " + courses);
    localStorage.setItem('Courses', JSON.stringify(courses));
}

function clearAllCart(e) {
    e.preventDefault();
    while (cart.firstChild) {
        // console.log(cart.firstChild);
        // cart.removeChild(cart.firstChild);
        cart.firstChild.remove();
    }
    localStorage.clear("Courses");
}

function savetoStorage(course) {
    let allCourses = getAllSavedCourses();
    allCourses.push(course);
    localStorage.setItem("Courses", JSON.stringify(allCourses));
    // console.log("Added & Saved : " + );
}

function getAllSavedCourses() {
    let courses;
    if (localStorage.getItem("Courses") === null) {
        courses = [];
    } else {
        courses = JSON.parse(localStorage.getItem("Courses"));
    }
    return courses;
}

function loadAllSavedCourses() {
    let courses = getAllSavedCourses();
    courses.forEach(function(course) {
        addToCart(course);
    });
}

function addToCart(course) {
    let row = document.createElement('tr');
    row.innerHTML = `
        <tr>
            <td><img src="${course.image}" width=100></td>
            <td>${course.name}</td>
            <td>${course.price}</td>
            <td><a href="#" class="remove" data-id="${course.id}">X</a></td>
        </tr>
    `;
    cart.appendChild(row);
}
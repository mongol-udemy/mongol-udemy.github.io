export default class AllCourses {
    constructor(fetchUrl) {
        this.fetchUrl = fetchUrl;
        this.image = "";
        this.imageTablet = "";
        this.imageMobile = "";
        this.title = "";
        this.courses = "";
        this.coursesLength = 0;
    }

    render() {
        return `
        <div class="poster">
            <img style="width: 100%;" src="${this.image}" srcset="${this.imageTablet} 770w, ${this.imageMobile} 360w" sizes="(max-width: 1000px) 770px, (max-width: 769px) 360px" alt="background-image" />
            <form class="poster-search-container">
                <label>
                    <h3 class="poster-search-title">Ирээдүйгээ гэрэлтүүл</h3>
                    <p class="poster-search-alert">${this.title}</p>
                    <div class="poster-input-search-container">
                        <button class="poster-icon-btn" aria-label="search-bottom">
                            <i class="fas fa-search nav-icon"></i>
                        </button>
                        <input type="text" placeholder="Хайх..." class="poster-search-input" />
                    </div>
                </label>
            </form>
        </div>
        <div class="main-title-container">
            <button class="main-title">Бүх сургалтууд</button>
            <button class="main-title">Дизайн</button>
            <button class="main-title">IT & Software</button>
            <button class="main-title">Хувь хүний хөгжил</button>
            <button class="main-title">Photograph & Video</button>
        </div>
        <hr />
        <div id="cards-container" class="cards-container">
            ${this.courses}
        </div>
        `;
    }

    download(targetElement) {
        fetch(`${this.fetchUrl}latest`, {
            method: "GET",
            headers: {
                "secret-key":
                    "$2b$10$e2t.sqwHAkeJYFFxTTuaR.HvQ0cNJMRaF6dpaAaSw.5cm2HnT/b0O",
            },
        })
            .then((response) => {
                response.json().then((result) => {
                    this.image = result.image;
                    this.imageTablet = result.imageTablet;
                    this.imageMobile = result.imageMobile;
                    this.title = result.title;

                    let length = result.allCourses.length;

                    if (this.coursesLength < length) {
                        for (let i = this.coursesLength; i < length; i++) {
                            const course = new Course(
                                result.allCourses[i].id,
                                result.allCourses[i].img,
                                result.allCourses[i].title,
                                result.allCourses[i].teacher,
                                result.allCourses[i].star,
                                result.allCourses[i].studentNumber,
                                result.allCourses[i].price,
                                result.allCourses[i].salePrice,
                                result.allCourses[i].bestSeller
                            );

                            this.courses = course.render() + this.courses;
                        }

                        this.coursesLength = length;
                    } else if (this.coursesLength > length) {
                        this.coursesLength = 0;
                        this.courses = "";
                        this.download(targetElement);
                    }

                    gebi(targetElement).innerHTML = this.render();
                });
            })
            .catch((err) => {
                console.error(err);
            });
    }
}

const gebi = (id) => document.getElementById(id);

export class Course {
    constructor(
        id = null,
        image = "",
        title = "",
        teacher = "",
        star = null,
        studentNumber = "",
        price = null,
        salePrice = null,
        bestSeller = false
    ) {
        this.id = id;
        this.image = image;
        this.title = title;
        this.teacher = teacher;
        this.star = star;
        this.studentNumber = studentNumber;
        this.price = price;
        this.salePrice = salePrice;
        this.bestSeller = bestSeller;
    }

    render() {
        return `<div id="card${this.id}" class="card-container">
                    <a href="lesson.html">
                        <img src="${this.image}" srcset="${this.image} 1x, ${
            this.image
        } 2x" alt="Course" class="card-image" />
                        <h2 class="card-title">
                            ${this.title}
                        </h2>
                        <small class="card-teacher">${this.teacher}</small>
                        <div class="card-rating-container">
                            <span>&#11088; ${this.star}</span>
                            <span>(${this.studentNumber})</span>
                        </div>
                        <div class="card-price"><span>₮${
                            this.salePrice
                        }</span><small>₮${this.price}</small></div>
                        ${
                            this.bestSeller
                                ? `<small class="card-best">Best seller</small>`
                                : `<small></small>`
                        }
                    </a>
                </div>`;
    }
}

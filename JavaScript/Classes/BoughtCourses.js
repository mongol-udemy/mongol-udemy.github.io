import { Course } from "./AllCourses.js";

export default class BoughtCourses {
    constructor(fetchUrl) {
        this.fetchUrl = fetchUrl;
        this.courses = "";
        this.coursesLength = 0;
    }

    render() {
        return `
        <h2>Таны авсан сургалтууд</h2>
        <hr />
        <div class="cards-container">
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
                    let length = result.boughtCourses.length;

                    if (this.coursesLength < length) {
                        for (let i = this.coursesLength; i < length; i++) {
                            const course = new Course(
                                result.boughtCourses[i].id,
                                result.boughtCourses[i].img,
                                result.boughtCourses[i].title,
                                result.boughtCourses[i].teacher,
                                result.boughtCourses[i].star,
                                result.boughtCourses[i].studentNumber,
                                result.boughtCourses[i].price,
                                result.boughtCourses[i].salePrice,
                                result.boughtCourses[i].bestSeller
                            );

                            this.courses = course.render() + this.courses;
                        }

                        this.coursesLength = length;
                    } else if (this.coursesLength > length) {
                        this.coursesLength = 0;

                        for (let i = this.coursesLength; i < length; i++) {
                            const course = new Course(
                                result.boughtCourses[i].id,
                                result.boughtCourses[i].img,
                                result.boughtCourses[i].title,
                                result.boughtCourses[i].teacher,
                                result.boughtCourses[i].star,
                                result.boughtCourses[i].studentNumber,
                                result.boughtCourses[i].price,
                                result.boughtCourses[i].salePrice,
                                result.boughtCourses[i].bestSeller
                            );

                            this.courses = course.render() + this.courses;
                        }

                        this.coursesLength = length;
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

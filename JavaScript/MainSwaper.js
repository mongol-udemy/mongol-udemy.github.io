import AllCourses from "./Classes/AllCourses.js";
import Lesson from "./Classes/Lesson.js";
import BoughtCourses from "./Classes/BoughtCourses.js";

export function swap_home() {
    const allCourses = new AllCourses(
        "https://api.jsonbin.io/b/5fba486ba825731fc0a11517/"
    );
    allCourses.download("main");

    setInterval(() => allCourses.download("main"), 10000);
}

export function swap_cart() {
    const boughtCourses = new BoughtCourses(
        "https://api.jsonbin.io/b/5fba45a090e7c66167f564c4/"
    );

    boughtCourses.download("main");
    setInterval(() => boughtCourses.download("main"), 10000);
}

export function swap_lesson_description() {
    const lesson = new Lesson(
        "https://api.jsonbin.io/b/5fb94545a825731fc0a0d84f"
    );

    lesson.Download("main");
}

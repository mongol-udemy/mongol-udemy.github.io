export default class Lesson {
    constructor(fetchUrl) {
        this.id = null;
        this.title = " ";
        this.description = " ";
        this.aboutTeacher = " ";
        this.videoLink = "#";
        this.contents = "";
        this.lastUpdated = Date.now();
        this.hasChanged = false;
        this.url = fetchUrl;
    }
    Render() {
        return `<h1>${this.title}</h1>
    <div class="main-bottom">
      <div class="video-container">
        <video controls>
          <source src="${this.videoLink}" />
        </video>
        <div class="description-btn-ul">
          <button class="description-li-btn li-active" onclick='changeStyle2(
            "description-li-btn",
            0, "li-active", "description", "${this.description}"
          )' >
            Сургалтын талаар
          </button>
          <button class="description-li-btn" onclick='changeStyle2(
            "description-li-btn",
            1, "li-active", "description", "${this.aboutTeacher}"
          )'>Багшийн талаар</button>
        </div>
        <div class="description">
          <p id="description">
          ${this.description}
          </p>
        </div>
      </div>
      <section class="content-container">
        <h2 class="content-title">Агуулга</h2>
        ${this.contents}
      </section>
    </div>`;
    }
    Download(targetElement) {
        var myHeaders = new Headers();
        myHeaders.append(
            "secret-key",
            "$2b$10$e2t.sqwHAkeJYFFxTTuaR.HvQ0cNJMRaF6dpaAaSw.5cm2HnT/b0O"
        );

        var requestOptions = {
            method: "GET",
            headers: myHeaders,
            redirect: "follow",
        };

        fetch(`${this.url}/latest`, requestOptions)
            .then((response) => {
                response.json().then((result) => {
                    this.id = result.id;
                    this.videoLink = result.video_link;
                    this.title = result.title;
                    this.description = result.description;
                    this.aboutTeacher = result.about_teacher;
                    result.contents.map((item, key) => {
                        const content = new Contents(
                            item.id,
                            item.title,
                            item.time,
                            item.is_free,
                            key
                        );
                        this.contents = this.contents.concat(content.Render());
                    });

                    gebi(targetElement).innerHTML = this.Render();
                });
            })
            .catch((err) => console.info(err));
    }
}

const gebi = (id) => document.getElementById(id);

class Contents {
    constructor(id = null, title = "", time = "", isFree = false, idx) {
        this.id = id;
        this.title = title;
        this.time = time;
        this.isFree = isFree;
        this.idx = idx;
    }

    Render() {
        return `<a href="#" class="content-list-btn ${
            this.idx == 0 && "content-active"
        }">
      <i class="far fa-play-circle"></i>
      <p class="lesson-title">${this.idx + 1}. ${this.title}</p>
      <p class="lesson-time">${this.time}</p>
    </a>`;
    }
}

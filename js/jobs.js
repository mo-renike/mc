const jobWrapper = document.querySelector("#jobList");
const search = document.querySelector("#job_search_bar");
const jobSearchBtn = document.querySelector("#job_search_btn");
const jobList = document.querySelectorAll(".job__item");

let availableJobs = [
  {
    img: "/img/logo2.png",
    title: "UX Writer",
    location: "Banana Island, Lagos",
    req: "Since 2010, our vision has been to help property buyers become cashflow landlords. Hence Middlechase is regarded as The No. 1 Rental Income Developerz",
    timeStamp: 3,
    tags: ["remote", "full time", "hybrid"],
  },
  {
    img: "/img/jobLogo2.png",
    title: "Site Manager",
    location: "Ajah, Lagos",
    req: "Since 2010, our vision has been to help property buyers become cashflow landlords. Hence Middlechase is regarded as The No. 1 Rental Income Developer",
    timeStamp: 2,
    tags: ["remote", "contract"],
  },
  {
    img: "/img/logo2.png",
    title: "UX Writer",
    location: "Remote",
    req: "Since 2010, our vision has been to help property buyers become cashflow landlords. Hence Middlechase is regarded as The No. 1 Rental Income Developer",
    timeStamp: 5,
    tags: ["remote", "full time"],
  },
  {
    img: "/img/jobLogo2.png",
    title: "Site Manager",
    location: "Ajah, Lagos",
    req: "Since 2010, our vision has been to help property buyers become cashflow landlords. Hence Middlechase is regarded as The No. 1 Rental Income Developer",
    timeStamp: 2,
    tags: ["on-site", "contract"],
  },
  {
    img: "/img/logo.png",
    title: "Backend Developer",
    location: "Ajah, Lagos",
    req: "Since 2010, our vision has been to help property buyers become cashflow landlords. Hence Middlechase is regarded as The No. 1 Rental Income Developer",
    timeStamp: 2,
    tags: ["on-site", "contract"],
  },
];

// console.log(availableJobs.map(job  => job.img ));
let template = availableJobs
  .map(
    ({ img, title, location, req, timeStamp, tags }) =>
      ` <div class="job__item">
           <div class="job__item-header">
               <img src=${img} alt="" class="job__item-img" />
               <div>
                  <h5>${title}</h5>
                  <p><i class="fa fa-map-marker-alt"></i> ${location}</p>
               </div>
           </div>
           <div class="job__item-content">
                 <b>Requirements: </b>${
                   req.length < 20 ? `${req}` : `${req.substring(0, 140)}...`
                 } <a href="">Read More</a>
           </div>
           <div class="job__item-footer">
                <div class="job__item-tags">
                    <ul>${tags.map((tag) => `<li>${tag}</li>`).join("")}</ul>
                </div>
                <p class="job__item-date"> - Posted ${timeStamp} days ago</p>
           </div>
     </div>`
  )
  .join("");

jobWrapper.innerHTML = template;

// search functionality

jobSearchBtn.addEventListener("click", (e) => {
  e.preventDefault();
  let query = search.value.toLowerCase();

  let result = availableJobs.map((job) => {
    return job.title;
  });


  console.log(result, query);
});

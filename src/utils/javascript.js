let index = 0;
let interval;
let i;

export default function autoSlide(images) {
  clearInterval(interval);
  images[1].style.display = "none";

  interval = setInterval(() => {
    for (i = 0; i < images.length; i++) {
      images[i].classList.add("fadeSlide");
    }
    for (i = 0; i < images.length; i++) {
      images[i].style.display = "none";
    }
    index++;
    if (index > images.length) {
      index = 1;
    }
    images[index - 1].style.display = "block";
  }, [2000]);
}


function handleTab(links) {
  for (i = 0; i < links.length; i++) {
    links[i].addEventListener("click", () => {
      var currentactive = document.getElementsByClassName("active-2ycHU");
      if (currentactive.length > 0) {
        currentactive[0].className = currentactive[0].className.replace(
          "active-2ycHU",
          ""
        );
      }
      links[i].className = "active-2ycHU";
    });
  }
}






export { autoSlide, handleTab };


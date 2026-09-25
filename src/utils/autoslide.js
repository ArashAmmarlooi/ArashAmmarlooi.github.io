export default function autoslide() {
  const images = document.querySelectorAll(".__layout__websvg__1UnWI");
  let index = 0;
  // for (let i = 0; i < images.length; i++) {
  //     // images[i].classList.remove(".__layout__active__1zLGD")
  // }
  if (index >= images.length) index = 0;
  // if ( index === 0 )
  images[index].classList.remove(".__layout__active__1zLGD");
  index++;
  images[index].classList.add(".__layout__active__1zLGD");
}

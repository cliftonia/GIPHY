const searchInput = document.querySelector(".search-input");
const searchBtn = document.querySelector(".search-btn");
var offset = 0;
let last_known_scroll_position = 0;
let ticking = false;
const gImg = document.querySelector("giph-image");
const imgSection = document.querySelector(".img-section");
const loadMoreBtn = document.querySelector(".more-btn");

const handleClick = function(event) {
  event.preventDefault();

  var giphImages = document.querySelectorAll(".giph-image");
  var shakeBtn = document.querySelectorAll(".parrot-btn");

  shakeBtn.forEach(function(giph) {
    giph.remove();
  });

  giphImages.forEach(function(giph) {
    giph.remove();
  });

  var options = {
    url: `https://cors-anywhere.herokuapp.com/http://api.giphy.com/v1/gifs/search?q=${searchInput.value}&api_key=Tg9V3TkAY9BFePnwVwuRzQRa5bBgsejc&limit=10&offset=${offset}`
  };

  $.ajax(options).done(function(resp) {
    var results = resp.data;

    results.forEach(function(result) {
      imgSection.innerHTML += `
        <article class="img-wrapper">
          <img class="giph-image" src="${result.images.original.url}" />
          <button class="parrot-btn btn-success">Flash</button>
        </article>
      `;
    });
    offset += 10;
  });
};

const addMore = event => {
  if (
    $(window).scrollTop() == $(document).height() - $(window).height() &&
    offset < 50
  ) {
    var options = {
      url: `https://cors-anywhere.herokuapp.com/http://api.giphy.com/v1/gifs/search?q=${searchInput.value}&api_key=Tg9V3TkAY9BFePnwVwuRzQRa5bBgsejc&limit=10&offset=${offset}`
    };

    $.ajax(options).done(function(resp) {
      var results = resp.data;
      offset += 10;
      results.forEach(function(result) {
        var newImg = document.createElement("img");
        var newBtn = document.createElement("button");
        var newArticle = document.createElement("article");
        newArticle.className = "img-wrapper";
        newBtn.className = "parrot-btn btn-success";
        newBtn.innerHTML = "Flash";
        newImg.className = "giph-image";
        newImg.src = result.images.original.url;
        newArticle.appendChild(newImg);
        newArticle.appendChild(newBtn);
        imgSection.appendChild(newArticle);
      });
    });
  } else {
    loadMoreBtn.style.display = "block";
  }
};

const addMoreBtn = even => {
  var options = {
    url: `https://cors-anywhere.herokuapp.com/http://api.giphy.com/v1/gifs/search?q=${searchInput.value}&api_key=Tg9V3TkAY9BFePnwVwuRzQRa5bBgsejc&limit=10&offset=${offset}`
  };

  $.ajax(options).done(function(resp) {
    var results = resp.data;
    offset += 10;
    results.forEach(function(result) {
      var newImg = document.createElement("img");
      var newBtn = document.createElement("button");
      var newArticle = document.createElement("article");
      newArticle.className = "img-wrapper";
      newBtn.className = "parrot-btn btn-success";
      newBtn.innerHTML = "Flash";
      newImg.className = "giph-image";
      newImg.src = result.images.original.url;
      newArticle.appendChild(newImg);
      newArticle.appendChild(newBtn);
      imgSection.appendChild(newArticle);
    });
  });
};

const addAnimation = event => {
  var giphToAnimate = event.target
    .closest(".img-wrapper")
    .querySelector(".giph-image");
  giphToAnimate.classList.add("animated", "flash");
};

searchBtn.addEventListener("click", handleClick);
window.addEventListener("scroll", addMore);

imgSection.addEventListener("click", addAnimation);

loadMoreBtn.addEventListener("click", addMoreBtn);

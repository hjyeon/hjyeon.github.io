/* Set the width of the sidebar to 250px (show it) */
function openNav() {
  document.getElementById("menu").style.width = "250px";
}
  
/* Set the width of the sidebar to 0 (hide it) */
function closeNav() {
  document.getElementById("menu").style.width = "0";
}

function usefulLink(hyperlink) {
  document.getElementById("detail").innerHTML = "";
  document.getElementById("message").innerHTML = "";
  document.getElementById("root").innerHTML = "<b> Here are some links to find more about Amazon categories: </b><br> <br>\
  🔍 <a href=\"https://sellercentral.amazon.com/gp/help/external/G200332540?language=en_US\" target=\"_blank\">Amazon Overview of Categories</a><br>\
  💸 <a href=\"https://sellercentral.amazon.com/gp/help/external/200336920\"target=\"_blank\">Amazon Category Fee Information</a><br>\
  ❓ <a href=\"https://sellercentral.amazon.com/forums/t/why-has-amazon-locked-the-everything-else-category-any-one-know/405988\"target=\"_blank\">Why did Amazon disable Everything Else category?</a><br>"
}

function data() {
  document.getElementById("detail").innerHTML = "";
  document.getElementById("message").innerHTML = "";
  document.getElementById("root").innerHTML = "💾 The complete dataset used for making this tool can be found \
  <a href = \"https://www.kaggle.com/dataset/f17ddcc077d5868b9ce1ed8a3d267ad03ebf17d5f7a97fc1e12a3d16453499f2\"target=\"_blank\">HERE</a><br>\
  📌 Metadata was downloaded from \
  <a href = \"http://jmcauley.ucsd.edu/data/amazon/index.html\"target=\"_blank\">HERE</a><br>\
  📌 Metadata was processed by modifying a python code written by \
  <a href = \"https://pages.cs.wisc.edu/~gleicher/\"target=\"_blank\">Prof. Michael Gleicher</a><br>\
  ⚠️ <a href=\"https://graphics.cs.wisc.edu/Courses/765-f2020/pages/dc3/\"target=\"_blank\">This tool was built as a project for the data visualization course.</a>\
   The data used for making this tool is from 2014 data. Since the data is outdated, I do not recommend using this tool for getting real advice on selling on Amazon.<br>\
  📑 <b>Table View for 85 Main Categories:</b> Average Price only considers products with known prices. If everything in the category has no price information, then the default value for the average price is $0. \
  <iframe src=\"https://docs.google.com/spreadsheets/d/e/2PACX-1vQmyYsTOmHisR82yM_AHLmAjaI7d_TI9Vz20_tQdABgX-n60C95SUY_p1iB8CwPHcfO5sWYHu5HhrjL/pubhtml?widget=true&amp;headers=false\" width=\"900\" height=\"500\"></iframe>"
}
function userGuide(){
  document.getElementById("detail").innerHTML = "";
  document.getElementById("message").innerHTML = "";
  document.getElementById("root").innerHTML = "<iframe src=\"https://docs.google.com/document/d/e/2PACX-1vTiUgAQEanzFyQheKu9RmkovpHOS7IXNPf1N71DIHfGo1948dbUulgp1kgOA3BwfxLkaci1-WPCqC6z/pub?embedded=true\" width=\"900\" height=\"500\"></iframe>"

}
function hideMessage(button) {
  let x = document.getElementById("message");
  if (x.style.display === "none") {
      x.style.display = "block";
      button.textContent = "Hide Message";
    } else {
      x.style.display = "none";
      button.textContent = "Show Message";
    }
}
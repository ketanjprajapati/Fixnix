function updateDropdown2() {
    var dropdown1 = document.getElementById("dropdown1");
    var dropdown2 = document.getElementById("dropdown2");
    var dropdown3 = document.getElementById("dropdown3");

    dropdown2.disabled = false;
    dropdown2.innerHTML = "";
    dropdown2.add(new Option("Select a brand", "0"));

    if (dropdown1.value === "phone") {
        dropdown2.add(new Option("Apple", "apple"));
        dropdown2.add(new Option("Samsung", "samsung"));
        dropdown2.add(new Option("Asus", "asus"));
    } else if (dropdown1.value === "computer") {
        dropdown2.add(new Option("Dell", "dell"));
        dropdown2.add(new Option("HP", "hp"));
        dropdown2.add(new Option("Lenovo", "lenovo"));
    } else if (dropdown1.value === "laptop") {
        dropdown2.add(new Option("Apple", "apple"));
        dropdown2.add(new Option("Dell", "dell"));
        dropdown2.add(new Option("HP", "hp"));
    }

    dropdown3.disabled = true;
    dropdown3.innerHTML = "";
    dropdown3.add(new Option("Select a model", "0"));
}

function updateDropdown3() {
    var dropdown2 = document.getElementById("dropdown2");
    var dropdown3 = document.getElementById("dropdown3");

    dropdown3.disabled = false;
    dropdown3.innerHTML = "";
    dropdown3.add(new Option("Select a model", "0"));

    if (dropdown2.value === "apple") {
        dropdown3.add(new Option("Apple 6", "apple6"));
        dropdown3.add(new Option("Apple 7", "apple7"));
        dropdown3.add(new Option("Apple 8", "apple8"));
    } else if (dropdown2.value === "samsung") {
        dropdown3.add(new Option("Samsung Galaxy S10", "s10"));
        dropdown3.add(new Option("Samsung Galaxy S20", "s20"));
        dropdown3.add(new Option("Samsung Galaxy S21", "s21"));
    } else if (dropdown2.value === "asus") {
        dropdown3.add(new Option("Asus Zenfone 5", "zenfone5"));
        dropdown3.add(new Option("Asus Zenfone 6", "zenfone6"));
        dropdown3.add(new Option("Asus ROG Phone 2", "rog2"));
    } else if (dropdown2.value === "dell") {
        dropdown3.add(new Option("Dell XPS 13", "xps13"));
        dropdown3.add(new Option("Dell Inspiron 15", "inspiron15"));
        dropdown3.add(new Option("Dell Alienware 17", "alienware17"));
    } else if (dropdown2.value === "hp") {
        dropdown3.add(new Option("HP Pavilion", "pavilion"));
        dropdown3.add(new Option("HP Spectre x360", "spectre"));
        dropdown3.add(new Option("HP Omen", "omen"));
    } else if (dropdown2.value === "lenovo") {
        dropdown3.add(new Option("Lenovo ThinkPad X1 Carbon", "x1carbon"));
        dropdown3.add(new Option("Lenovo Yoga C940", "yogac940"));
        dropdown3.add(new Option("Lenovo Legion Y740", "legiony740"));
    }
}

// Initial update of dropdown2
updateDropdown2();

// Initial update of dropdown3
updateDropdown3();

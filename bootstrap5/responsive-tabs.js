document.addEventListener("DOMContentLoaded", () => {
    const tabContainer = document.getElementById("responsiveTabs");
    const allTabItems = tabContainer.querySelectorAll("li.nav-item:not(.dropdown)");
    const dropdown = document.getElementById("moreDropdown");
    const dropdownMenu = document.getElementById("moreDropdownMenu");
    const BUFFER_WIDTH = 55; // Prevent edge overflow causing wrap

    function resetTabs() {
        dropdownMenu.innerHTML = "";
        dropdown.classList.add("d-none");
        allTabItems.forEach(item => item.classList.remove("d-none"));
    }

    function moveOverflowTabsToDropdown() {
        const containerWidth = tabContainer.clientWidth;
        let totalWidth = 0;
        let overflowOccurred = false;

        allTabItems.forEach(tabItem => {
            const tabWidth = tabItem.offsetWidth;
            totalWidth += tabWidth;

            // If total width exceeds available space + buffer, move to dropdown
            if (totalWidth + dropdown.offsetWidth + BUFFER_WIDTH > containerWidth) {
                const link = tabItem.querySelector("a");
                const dropdownLink = link.cloneNode(true);
                dropdownLink.classList.replace("nav-link", "dropdown-item");

                dropdownMenu.appendChild(dropdownLink);
                tabItem.classList.add("d-none");
                overflowOccurred = true;
            }
        });

        if (overflowOccurred) {
            dropdown.classList.remove("d-none");
        }
    }

    function updateResponsiveTabs() {
        resetTabs();
        moveOverflowTabsToDropdown();
    }

    function handleDropdownTabClick(e) {
        if (e.target.matches("#moreDropdownMenu a")) {
            const tabTrigger = new bootstrap.Tab(e.target);
            tabTrigger.show();
        }
    }

    window.addEventListener("resize", updateResponsiveTabs);
    document.addEventListener("click", handleDropdownTabClick);

    // Initialize on load
    updateResponsiveTabs();
});

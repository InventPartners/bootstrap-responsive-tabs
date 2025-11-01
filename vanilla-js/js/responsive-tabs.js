document.addEventListener("DOMContentLoaded", () => {
    const tabContainer = document.getElementById("responsiveTabs");
    const allTabItems = [...tabContainer.querySelectorAll("li.nav-item:not(.dropdown)")];
    const dropdown = document.getElementById("moreDropdown");
    const dropdownToggle = document.getElementById("moreToggle");
    const dropdownMenu = document.getElementById("moreDropdownMenu");

    function moveOverflowTabs() {
        closeDropdown();
        dropdown.classList.add("d-none");
        dropdownMenu.innerHTML = "";
        allTabItems.forEach(tab => tab.classList.remove("d-none"));

        let availableWidth = tabContainer.clientWidth;
        let usedWidth = 0;
        let overflowTabs = [];

        allTabItems.forEach(tab => {
            usedWidth += tab.offsetWidth;
            if (usedWidth > availableWidth) {
                overflowTabs.push(tab);
            }
        });

        if (overflowTabs.length > 0) {
            dropdown.classList.remove("d-none");

            availableWidth = tabContainer.clientWidth - dropdown.offsetWidth;
            usedWidth = 0;
            overflowTabs = [];

            allTabItems.forEach(tab => {
                usedWidth += tab.offsetWidth;
                if (usedWidth > availableWidth) {
                    overflowTabs.push(tab);
                }
            });

            overflowTabs.forEach(tab => {
                const link = tab.querySelector("a").cloneNode(true);
                link.classList.add("dropdown-item");
                dropdownMenu.appendChild(link);
                tab.classList.add("d-none");
            });
        }
    }

    function activateTab(tabId) {
        document.querySelectorAll(".nav-link").forEach(link => link.classList.remove("active"));
        document.querySelectorAll(".tab-pane").forEach(pane => pane.classList.remove("active"));

        const selectedPane = document.querySelector(tabId);
        if (selectedPane) selectedPane.classList.add("active");

        const visibleTab = tabContainer.querySelector(`li.nav-item:not(.dropdown) a[href="${tabId}"]`);
        const dropdownTab = dropdownMenu.querySelector(`a[href="${tabId}"]`);

        if (dropdownTab) {
            dropdownToggle.classList.add("active");
            dropdownTab.classList.add("active");
        } else if (visibleTab) {
            visibleTab.classList.add("active");
            dropdownToggle.classList.remove("active");
        }
    }

    function openDropdown() {
        dropdownMenu.classList.add("show");
        dropdownToggle.classList.add("active");
        tabContainer.classList.add("dropdown-open");
    }

    function closeDropdown() {
        dropdownMenu.classList.remove("show");
        tabContainer.classList.remove("dropdown-open");
    }

    dropdownToggle.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        dropdownMenu.classList.contains("show") ? closeDropdown() : openDropdown();
    });

    document.addEventListener("click", (e) => {
        if (!dropdown.contains(e.target)) closeDropdown();
    });

    document.addEventListener("click", (e) => {
        if (e.target.matches(".nav-link, .dropdown-item")) {
            const targetId = e.target.getAttribute("href");
            if (targetId && targetId.startsWith("#")) {
                e.preventDefault();
                activateTab(targetId);
                closeDropdown();
            }
        }
    });

    window.addEventListener("resize", moveOverflowTabs);
    window.addEventListener("orientationchange", moveOverflowTabs);

    moveOverflowTabs();
});

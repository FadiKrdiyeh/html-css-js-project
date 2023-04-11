$(function () {
    // Something to do when page resizing.......
    $(window).on("resize", function () {
        // Reset navbar on resize...
        // After resize, if window size greater than mobile screen then will show navbar and reset, else will hide
        if (window.outerWidth > 991) {
            $(".navbar-collapse")
                .slideDown()
                .removeClass("show")
                .removeClass("collapse");
        } else {
            $(".navbar-collapse")
                .slideUp()
                .removeClass("show")
                .addClass("collapse");
        }

        // Dynamically add padding-bottom to body for the size of the footer... Just for responsive
        $("body").css({
            "padding-bottom": $("#footer").height(),
        });
    });

    // ============================================================================================================================================================================================================

    // Dynamically add padding-bottom to body for the size of the footer... Just for responsive
    $("body").css({
        "padding-bottom": $("#footer").height(),
    });

    // ============================================================================================================================================================================================================

    // Get page link from url like: [ /index.html ]
    const activePage = window.location.pathname;

    // Store all nav links in a variable
    const navLinks = $("nav .navbar-nav .nav-item .nav-link");

    /*
     * Loop through links and check if href attribute contains page name from url and add class active to it if true
     * This code will add class active dynamically to the link for visited page
     */
    navLinks.each(function () {
        /**
         * Compare between link value: [href="./pages/page.html"] and last part of url (localhost/pages/[page.html])
         * If link value contains the last part of url that mean this link must be active, so add active class...
         */
        if ($(this).attr("href").includes(activePage.split("/").pop())) {
            // Add class 'active'
            $(this).addClass("active");
        }
    });

    // ============================================================================================================================================================================================================

    // Toggle navbar on mobile screen when click navbar-toggler button...
    $(".navbar-toggler").on("click", function () {
        /**
         * 1- Slide navbar down to show and up to hide
         * 2- Toggle class 'show' for css styles.. add if navbar slide down and remove if navbar slide up
         * 3- Toggle class 'collapse' for css styles.. add if navbar slide down and remove if navbar slide up
         */
        $(".navbar-collapse")
            .slideToggle()
            .toggleClass("show")
            .toggleClass("collapse");
    });

    // ============================================================================================================================================================================================================

    // Auto play videos when one finished...

    // Store videos in variables
    let video1 = $("#video1");
    let video2 = $("#video2");
    let video3 = $("#video3");
    let video4 = $("#video4");

    // Play second video when first video finished
    video1.on("ended", function () {
        // Play next video
        video2.get(0).play();
        // Uncheck radio input for this video
        $("#slides_2").prop("checked", true);
        // Change data property for the hidden div and set to current video played
        $(".current-video-number").data("video", "video2");
    });

    // Play third video when second video finished
    video2.on("ended", function () {
        // Play next video
        video3.get(0).play();
        // Uncheck radio input for this video
        $("#slides_3").prop("checked", true);
        $(".current-video-number").data("video", "video3");
    });
    // Play fourth video when third video finished
    video3.on("ended", function () {
        // Play next video
        video4.get(0).play();
        // Uncheck radio input for this video
        $("#slides_4").prop("checked", true);
        // Change data property for the hidden div and set to current video played
        $(".current-video-number").data("video", "video4");
    });
    // Play first video when fourth video finished
    video4.on("ended", function () {
        // Play next video
        video1.get(0).play();
        // Uncheck radio input for this video
        $("#slides_1").prop("checked", true);
        // Change data property for the hidden div and set to current video played
        $(".current-video-number").data("video", "video1");
    });

    // Stop current video and play the next or previouse video when click on next, prev button or navigations buttons...
    $(".go-to-btn#goToVideo").on("click", function () {
        /**
         * Call custom function which stop the current video and reset its time...
         * Whe get the current video from a hidden div (data property) which change when video ended
         */
        // The video number which will played
        let requestedVideo = $(this).data("num");
        // Current video played ID
        let currentVideoId = $(".current-video-number").data("video");

        // Stop the current video
        stopVideo($("#" + currentVideoId).get(0));
        // Play requested video
        $("#video" + requestedVideo)
            .get(0)
            .play();
        // Store new current video ID in the hidden div
        $(".current-video-number").data("video", "video" + requestedVideo);
    });

    // ============================================================================================================================================================================================================

    let isScrolledIntoStatistics = false;

    // Something to do when page scrolling.......
    $(document).on("scroll", function () {
        // Trigger counter method for statistics elements if its show on window and not counted yet.
        if (isScrolledIntoView($("#statistics")) && !isScrolledIntoStatistics) {
            isScrolledIntoStatistics = true;

            // Start counter for Properties Available
            count($("#propertiesAvailable"));
            // Start counter for Satisfied Customers
            count($("#satisfiedCustomers"));
            // Start counter for Daily Visitors
            count($("#dailyVisitors"));
        }
    });

    // ============================================================================================================================================================================================================

    // Open image viewer and get images when click on some image...
    $(".product-item .product-image").on("click", function () {
        // Hide scrollbar
        $("body").css({
            "overflow-y": "hidden",
        });

        // Get images count for this product... Its stored in data-images attribute
        let imagesCount = $(this).find("img").data("images");
        // Get path to this product images from src attribute.. split using [/] to remove file name and get the path only
        let splittedPath = $(this).find("img").attr("src").split("/");
        // Remove file name Which is the last elemnt in the array to get the path only
        splittedPath.pop();

        // Init images elements to append them.. This is the main image which show on product details
        let imagesHTML = `<li>
                            <p>
                                <img
                                    src="${$(this).find("img").attr("src")}"
                                    alt="Product main"
                                    id="mainImage"
                                />
                            </p>
                        </li>`;

        // Init arrows elements for each image.. This for main
        let arrowsHTML =
            '<label class="go-to-btn go-to-image" for="slides_0"></label>';

        // Init inputs elements for each image.. This for main and its checked by default
        let inputsHTML = `<input
                                type="radio"
                                name="slides"
                                checked="checked"
                                id="slides_0"
                            />`;

        // Loop through images dynamically depend on images count, and create [image item - arrow - input] elements for each image
        for (let i = 1; i <= imagesCount; i++) {
            // This is the full src value for image [EX: ../assets/images/products/villas/1/1.webp]
            let imagePath = `${splittedPath.join("/")}/${i}.webp`;

            // Each loop create image element and add it to the previouse value
            imagesHTML += `<li>
                                <p>
                                    <img
                                        src="${imagePath}"
                                        alt="Product ${i}"
                                        id="image${i}"
                                    />
                                </p>
                            </li>`;

            // Each loop create label element for each image and add it to the previouse value
            arrowsHTML += `<label class="go-to-btn go-to-image" for="slides_${i}"></label>`;

            // Each loop create input element for each image and add it to the previouse value
            inputsHTML += `<input type="radio" name="slides" id="slides_${i}" />`;
        }

        // Add gotto-first and goto-last labels
        arrowsHTML += ` <label class="goto-first go-to-btn go-to-image" for="slides_0"></label>
                        <label class="goto-last go-to-btn go-to-image" for="slides_${imagesCount}"></label>`;

        // ---------------------------------------------------------------

        // After create all elements for all images for this product.. let's append them to DOM
        // Add inputs to id="slider1" element before everything at the top
        $("#slider1").prepend(inputsHTML);
        // Append images elements to class="image-viewer-items" element which carries all images items
        $("#slider1 .image-viewer-items").append(imagesHTML);
        // Append arrows to class="image-viewer-arrows" element which contains all arrows
        $("#slider1 .image-viewer-arrows").append(arrowsHTML);

        // ---------------------------------------------------------------

        // Show image viewer after adding all elements
        $("#imageViewer").slideDown({
            duration: 100,
            start: function () {
                $(this).css({
                    display: "flex",
                });
            },
        });
    });

    // ============================================================================================================================================================================================================

    // Close image viewer on click on close button...
    $("#closeViewerBtn").on("click", function () {
        // Call function to close Image Viewer
        closeImageViewer();
    });

    // Close Image Viewer When click ESC on keyboard
    $(document).on("keyup", function (e) {
        if (e.key == "Escape") {
            // Call function to close Image Viewer
            closeImageViewer();
        }
    });
});

// ///////////////////////////// Functions ///////////////////////////// //
/**
 * This method stop the video which passed as a parameter
 * @param {HTMLVideoElement} video Video to stop and reset
 */
function stopVideo(video) {
    // Stop video
    video.pause();
    // Reset time video to start for next play
    video.currentTime = 0;
}

// ============================================================================================================================================================================================================

/**
 * Check if scrolled to element
 * @param {HTMLElement} element The element to check if scrolled into
 * @returns {boolean}
 */
function isScrolledIntoView(element) {
    // Check if element is exist first...
    if (element.get(0) != undefined) {
        // Get top position of the window
        let docViewTop = $(window).scrollTop();
        // Get hieght from page start to position which scolled to
        let docViewBottom = docViewTop + $(window).height();
        // Get top position of an element
        let elemTop = $(element).offset().top;
        // Get bottom position of an element
        let elemBottom = elemTop + $(element).height();
        // Check if scrolled to element by compare top and bottom positions of the element with top and bottom window positions. Return true or false...
        return elemBottom <= docViewBottom && elemTop >= docViewTop;
    }

    // Return false if element not exist
    return false;
}

// ============================================================================================================================================================================================================

/**
 * Start counter for an element which has data-count property specify the maximum count
 * Recursive function which call itself until reach the maximum count
 * The time for settimeout will be dynamically, so it convert big numbers to small and small numbers to big
 * We need this convert step because big numbers may take long time before it finish counting, so it must be faster...
 * Otherwise, small number will finish faster, so it must be slower..
 * @param {*} $this The element to start count
 */
function count($this) {
    let currentValue = parseInt($this.html(), 10);
    let toValue = $this.data("count");

    if (!$this.data("isCounting") && currentValue < toValue) {
        $this.html(++currentValue);
        $this.data("isCounting", true);
        setTimeout(() => {
            $this.data("isCounting", false);
            count($this);
        }, 1000 / toValue);
    }
}

// ============================================================================================================================================================================================================

/**
 * Function to close Image viewer
 * We use a function because of using this code multiple times
 */
function closeImageViewer() {
    $("body").css({
        "overflow-y": "auto",
    });

    // Clear elements [Images - arrows - inputs] to use it again for other images
    // Clear inputs
    $("#slider1 input").remove();
    // Clear images items
    $("#slider1 .image-viewer-items").html("");
    // Clear arrows
    $("#slider1 .image-viewer-arrows").html("");
    // Slide down image viewer and show images
    $("#imageViewer").slideUp(100);
}

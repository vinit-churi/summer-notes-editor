// import { template1 } from "./templates";
import { template1 } from "./templates.js";

window.addEventListener("DOMContentLoaded", () => {
  window.addEventListener("message", function (event) {
    if (event.origin !== "http://localhost:3000") return;
    console.log("receiving in iframe", event.data);
  });

  parent.postMessage("sending from iframe", "http://localhost:3000");

  const HelloButton = function (context) {
    const ui = $.summernote.ui;

    // create button
    const button = ui.button({
      contents: '<i class="fa fa-child"/> Page Break',
      tooltip: "Insert Page Break",
      click: function () {
        // invoke insertNode method with a div that represents a page break
        context.invoke(
          "editor.insertNode",
          $('<div class="page-break" data-content="Next Page"></div>')[0]
        );
        // insert a new paragraph after the page break
        context.invoke("editor.insertNode", $("<p><br></p>")[0]);
      },
    });

    return button.render(); // return button as jquery object
  };

  $("#summernote").summernote({
    height: window.innerHeight, // set editor height
    focus: true, // set focus to editable area after initializing summernote
    callbacks: {
      onChange: function (contents, $editable) {
        // Send a message to the parent window when the content changes
        parent.postMessage(contents, "http://localhost:3000");
      },
    },
    toolbar: [
      // Include the default buttons
      ["style", ["style"]],
      ["font", ["bold", "underline", "clear"]],
      ["fontname", ["fontname"]],
      ["color", ["color"]],
      ["para", ["ul", "ol", "paragraph"]],
      ["table", ["table"]],
      ["insert", ["link", "picture", "video"]],
      ["view", ["fullscreen", "codeview", "help"]],
      // Add the hello button
      ["myButton", ["hello"]],
    ],
    buttons: {
      // Map the hello button to the HelloButton function
      hello: HelloButton,
    },
  });

  $("#summernote").summernote("code", template1);
});

// import { template1 } from "./templates";
import { template1, createInitTemplate } from "./templates.js";

window.addEventListener("DOMContentLoaded", () => {
  let isProgrammaticChange = false;
  const pageBreakButton = function (context) {
    const ui = $.summernote.ui;

    // create button
    const button = ui.button({
      contents: '<i class="fa fa-cut"/> Page Break',
      tooltip: "Insert Page Break",
      click: function () {
        // invoke insertNode method with a div that represents a page break
        context.invoke(
          "editor.insertNode",
          $(
            '<div class="page-break" style="page-break-after: always;" data-content="Next Page"></div>'
          )[0]
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
        parent.postMessage(
          {
            type: "contentChange",
            data: contents,
          },
          "*"
        );
      },
      onInit: function () {
        // console.log("is this initializing correctly?");
        const loader = document.querySelector(".loader");
        loader.classList.add("hide");
        // initCreateTemplate();
        editorInitialized();
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
      ["myButton", ["pageBreak"]],
    ],
    buttons: {
      // Map the hello button to the HelloButton function
      pageBreak: pageBreakButton,
    },
  });

  function editorInitialized() {
    parent.postMessage(
      {
        type: "editorInitialized",
        data: null,
      },
      "*"
    );
  }

  function initCreateTemplate(template) {
    //   parent.postMessage(
    //       {
    //           type: "init",
    //           data: null,
    //         },
    //         "https://test.uni5.tech"
    //         );
    if (template) {
      $("#summernote").summernote("code", template);
    }
  }

  window.addEventListener("message", function (event) {
    // if (event.origin !== "https://test.uni5.tech") return;
    if (event.data.type === "setTemplateContent") {
      initCreateTemplate(event.data?.data);
    }

    if (event.data.type === "replaceWithFieldValue") {
      const { key, value } = event.data.data;
      const content = $("#summernote").summernote("code");
      const newContent = content.replace(
        new RegExp(`\\[${key}\\]`, "g"),
        value
      );
      $("#summernote").summernote("code", newContent);
    }

    if (event.data.type === "fieldChangeContent") {
      const newContentFromParent = event.data.data;
      $("#summernote").summernote("code", newContentFromParent);
    }
  });

  parent.postMessage("sending from iframe", "*");
});

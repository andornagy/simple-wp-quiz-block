import "./index.scss";
import { TextControl, Button } from "@wordpress/components";
import BlockToolbar from "./components/backend/BlockToolbar";
import SidePanel from "./components/backend/SidePanel";
import Answer from "./components/backend/Answer";

(function () {
  let locked = false;

  wp.data.subscribe(function () {
    const results = wp.data
      .select("core/block-editor")
      .getBlocks()
      .filter(function (block) {
        return (
          block.name == "andornagy/simple-wp-quiz-block" &&
          block.attributes.correctAnswer == undefined
        );
      });

    if (results.length && locked == false) {
      locked = true;
      wp.data.dispatch("core/editor").lockPostSaving("noanswer");
    }

    if (!results.length && locked) {
      locked = false;
      wp.data.dispatch("core/editor").unlockPostSaving("noanswer");
    }
  });
})();

wp.blocks.registerBlockType("andornagy/simple-wp-quiz-block", {
  title: "A Simple WP Quiz Block",
  icon: "smiley",
  category: "common",
  description: "Create a simple question",
  attributes: {
    question: { type: "string" },
    answers: { type: "array", default: [""] },
    correctAnswer: { type: "number", default: undefined },
    bgColor: { type: "string", default: "#ebebeb" },
    theAligment: { type: "string", default: "left" },
  },
  example: {
    attributes: {
      question: "What is my name?",
      correctAnswer: 3,
      answers: ["Meowsalot", "Barksalot", "Purrsloud", "Brad"],
      bgColor: "#CFE8F1",
      theAligment: "center",
    },
  },
  edit: EditComponent,
  save: function () {
    return null;
  },
});

function EditComponent(props) {
  function updateQuestion(value) {
    props.setAttributes({
      question: value,
    });
  }

  function deleteAnswer(indexToDelete) {
    const newAnswers = props.attributes.answers.filter(function (x, index) {
      return index != indexToDelete;
    });
    props.setAttributes({ answers: newAnswers });

    if (indexToDelete == props.attributes.correctAnswer) {
      props.setAttributes({ correctAnswer: undefined });
    }
  }

  function markAsCorrect(index) {
    props.setAttributes({ correctAnswer: index });
  }

  return (
    <>
      <BlockToolbar
        theAligment={props.attributes.theAligment}
        onChange={(x) => props.setAttributes({ theAligment: x })}
      />

      <SidePanel
        bgColor={props.attributes.bgColor}
        onChangeComplete={(x) => {
          props.setAttributes({ bgColor: x.hex });
        }}
      />
      <div
        className="simple-wp-quiz-edit-block"
        style={{ backgroundColor: props.attributes.bgColor }}
        disableAlpha={true}
      >
        <TextControl
          label="Questions:"
          style={{ fontSize: "20px", textAlign: props.attributes.textAlign }}
          value={props.attributes.question}
          onChange={updateQuestion}
        />
        <p style={{ fontSize: "13px", margin: "20px 0 20px 0" }}>Answers:</p>

        {props.attributes.answers.map((answer, index) => {
          return (
            <Answer
              index={index}
              answer={answer}
              correctAnswer={props.attributes.correctAnswer}
              onChange={(newValue) => {
                const newAnswer = props.attributes.answers.concat([]);
                newAnswer[index] = newValue;
                props.setAttributes({ answers: newAnswer });
              }}
              onMarkAsCorrect={() => markAsCorrect(index)}
              onDelete={() => deleteAnswer(index)}
            />
          );
        })}

        <Button
          onClick={() => {
            props.setAttributes({
              answers: props.attributes.answers.concat([""]),
            });
          }}
          isPrimary
        >
          Add Another Answer
        </Button>
      </div>
    </>
  );
}

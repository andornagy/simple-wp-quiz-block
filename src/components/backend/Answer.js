import React from "react";
import {
  TextControl,
  Button,
  Flex,
  FlexBlock,
  FlexItem,
  Icon,
} from "@wordpress/components";

export default function Answer(props) {
  return (
    <Flex>
      <FlexBlock>
        <TextControl value={props.answer} onChange={props.onChange} />
      </FlexBlock>
      <FlexItem>
        <Button onClick={props.onMarkAsCorrect}>
          <Icon
            className="mark-as-correct"
            icon={
              props.correctAnswer == props.index ? "star-filled" : "star-empty"
            }
          />
        </Button>
      </FlexItem>
      <FlexItem>
        <Button isLink className="attention-delete" onClick={props.onDelete}>
          Delete
        </Button>
      </FlexItem>
    </Flex>
  );
}

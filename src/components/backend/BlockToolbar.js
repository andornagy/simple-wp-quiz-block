import { BlockControls, AlignmentToolbar } from "@wordpress/block-editor";

export default function BlockToolbar(props) {
  return (
    <BlockControls>
      <AlignmentToolbar value={props.theAligment} onChange={props.onChange} />
    </BlockControls>
  );
}

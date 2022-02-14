import React from "react";
import { ChromePicker } from "react-color";
import { PanelBody, PanelRow } from "@wordpress/components";
import { InspectorControls } from "@wordpress/block-editor";
export default function SidePanel(props) {
  return (
    <InspectorControls>
      <PanelBody title="Background Color">
        <PanelRow>
          <ChromePicker
            onChangeComplete={props.onChangeComplete}
            color={props.bgColor}
          />
        </PanelRow>
      </PanelBody>
    </InspectorControls>
  );
}

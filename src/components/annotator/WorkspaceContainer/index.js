// @flow

import React, { useMemo } from "react";
import Box from "@material-ui/core/Box";
import Workspace from "react-material-workspace-layout/Workspace";
import { styled } from "@material-ui/core/styles";
import DeleteIcon from "@material-ui/icons/Delete";

const HeaderLeftSideContainer = styled("div")({
  fontSize: 24,
  fontWeight: "bold",
});

export default ({
  children,
  onNext,
  onPrev,
  onRemoveSample,
  currentSampleIndex = 0,
  numberOfSamples = 1,
  globalSampleIndex = 1,
  titleContent,
  onClickHeaderItem,
}) => {
  const headerItems = useMemo(
    () =>
      [
        onRemoveSample && {
          name: "Delete",
          icon: <DeleteIcon />,
          onClick: () => onRemoveSample(globalSampleIndex),
        },
        (currentSampleIndex > 0 || onPrev) && {
          name: "Prev",
          onClick: onPrev,
          disabled: currentSampleIndex === 0,
        },
        (numberOfSamples > currentSampleIndex + 1 || onNext) && {
          name: "Next",
          onClick: onNext,
          disabled: currentSampleIndex >= numberOfSamples - 1,
        },
        { name: "Save" },
      ].filter(Boolean),
    [
      currentSampleIndex,
      globalSampleIndex,
      numberOfSamples,
      onNext,
      onPrev,
      onRemoveSample,
    ]
  );
  return (
    <Workspace
      headerLeftSide={
        titleContent === undefined ? (
          <Box paddingLeft={2}>
            <HeaderLeftSideContainer>
              Sample{" "}
              {numberOfSamples > 1
                ? `${currentSampleIndex} / ${numberOfSamples}`
                : `${globalSampleIndex}`}
            </HeaderLeftSideContainer>
          </Box>
        ) : (
          titleContent
        )
      }
      onClickHeaderItem={onClickHeaderItem}
      headerItems={headerItems}
      iconSidebarItems={[]}
      rightSidebarItems={[]}
    >
      <Box padding={2} style={{ width: "100%" }}>
        {children}
      </Box>
    </Workspace>
  );
};

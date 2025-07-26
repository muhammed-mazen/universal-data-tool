import React, { useState } from "react";
import NLPAnnotator from "../NLPAnnotator";
import useClobberedState from "../utils/use-clobbered-state";
import Box from "@material-ui/core/Box";
import AuthService from "../../../services/auth.service";
import {
  simpleSequenceAndRelationsToEntitySequence,
  entitySequenceToSimpleSeq,
} from "../TextEntityRecognition/convert-react-nlp-annotate-types";

export const TextEntityRelations = (props) => {
  const [currentSampleIndex, setCurrentSampleIndex] = useState(
    props.sampleIndex
  );
  const { t } = props;
  const initialSequence = props.samples[0].annotation
    ? entitySequenceToSimpleSeq(
        props.samples[0].document,
        props.samples[0].annotation.entities
      )
    : undefined;

  const initialRelations = props.samples[0].annotation?.relations || [];

  if (!props.interface.relationLabels) {
    throw new Error(
      "Relation labels not defined. Try adding some labels in setup."
    );
  }
  const appendDict = (dict, dict2) => {
    for (let key in dict2) {
      dict[key] = dict2[key];
    }
    return dict;
  };
  const onChange = (newSequence, newRelations) => {
    let newAnnotation = {
      entities: simpleSequenceAndRelationsToEntitySequence(
        newSequence,
        newRelations
      ),
    };
    props.onChange(newAnnotation, currentSampleIndex);
  };

  const addCommas = (num) => {
    if (num) {
      return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
    return num;
  };
  const removeNonNumeric = (num) => {
    if (num) {
      return num.toString().replace(/[^0-9]/g, "");
    }
    return num;
  };

  return (
    <NLPAnnotator
      key={currentSampleIndex}
      titleContent={
        <Box paddingLeft={4}>
          {`${t("sample")} ${addCommas(
            removeNonNumeric(currentSampleIndex + 1)
          )}/${addCommas(removeNonNumeric(props.interface.dataCount))}`}
        </Box>
      }
      t={t}
      type={props.interface.type}
      rtl={props.interface.rtl}
      instructions={props.instructions}
      document={props.samples[0].document}
      entityLabels={props.interface.entityLabels}
      relationshipLabels={props.interface.relationLabels}
      labels={props.interface.labels || props.interface.entityLabels}
      initialSequence={initialSequence}
      initialRelationships={initialRelations}
      sampleIndex={currentSampleIndex}
      sampleCount={props.interface.dataCount}
      hotkeysEnabled={!props.disableHotkeys}
      onPageChange={(newIndex) => {
        props.onPageChange(newIndex);
      }}
      onChange={(result) => {
        let data = simpleSequenceAndRelationsToEntitySequence(result);
        data["currentSampleIndex"] = currentSampleIndex;
        props.onChange(appendDict(data, props.samples[0]));
      }}
      onPrev={(result) => {
        console.log(currentSampleIndex);
        if (setCurrentSampleIndex) {
          currentSampleIndex > 0 &&
            setCurrentSampleIndex(currentSampleIndex - 1);
          props.onSaveTaskOutputItem(
            currentSampleIndex > 0 ? currentSampleIndex - 1 : 0,
            appendDict(
              simpleSequenceAndRelationsToEntitySequence(result),
              props.samples[0]
            )
          );
        } else {
          props.onExit("go-to-previous");
        }
      }}
      onNext={(result) => {
        if (setCurrentSampleIndex) {
          currentSampleIndex < props.interface.dataCount - 1 &&
            setCurrentSampleIndex(currentSampleIndex + 1);
          props.onSaveTaskOutputItem(
            currentSampleIndex + 1,
            appendDict(
              simpleSequenceAndRelationsToEntitySequence(result),
              props.samples[0]
            )
          );
        } else {
          props.onExit("go-to-next");
        }
      }}
      onFinish={(result) => {
        props.onSaveTaskOutputItem(
          currentSampleIndex,
          simpleSequenceAndRelationsToEntitySequence(result)
        );
        let data = simpleSequenceAndRelationsToEntitySequence(result);

        props.onExit(appendDict(data, props.samples[0]));
      }}
      onLogout={(result) => {
        AuthService.logout();
        window.location.reload();
      }}
    />
  );
};

export default TextEntityRelations;

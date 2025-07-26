import _regeneratorRuntime from "@babel/runtime/regenerator";
import _asyncToGenerator from "@babel/runtime/helpers/esm/asyncToGenerator";
import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/styles";
import { parse as queryString } from "query-string";
import Button from "@material-ui/core/Button";
import axios from "axios";
import NLPAnnotator from "../NLPAnnotator";
import set from "lodash/set";
import cloneDeep from "lodash/cloneDeep";
import download from "downloadjs";
var useStyles = makeStyles({
  header: {
    display: "flex",
    padding: 10,
    backgroundColor: "#f8f8f8",
    alignItems: "center",
    borderBottom: "1px solid #ccc"
  },
  button: {
    marginLeft: 10,
    marginRight: 10
  },
  content: {
    padding: 10
  },
  warning: {
    fontSize: 11,
    color: "#f00",
    padding: 10,
    textAlign: "center"
  }
});
export default (function () {
  var c = useStyles();

  var _useState = useState([]),
      _useState2 = _slicedToArray(_useState, 2),
      samples = _useState2[0],
      changeSamples = _useState2[1];

  var _useState3 = useState(0),
      _useState4 = _slicedToArray(_useState3, 2),
      sampleIndex = _useState4[0],
      changeSampleIndex = _useState4[1];

  var _useState5 = useState({}),
      _useState6 = _slicedToArray(_useState5, 2),
      _useState6$ = _useState6[0],
      loadUrl = _useState6$.loadUrl,
      _useState6$$outputNam = _useState6$.outputName,
      outputName = _useState6$$outputNam === void 0 ? "dataset" : _useState6$$outputNam,
      changeMetaInfo = _useState6[1];

  useEffect(function () {
    function loadData() {
      return _loadData.apply(this, arguments);
    }

    function _loadData() {
      _loadData = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee() {
        var _ref, loadUrl, outputName, _yield$axios$get, data;

        return _regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _ref = queryString(window.location.search) || {}, loadUrl = _ref.load_url, outputName = _ref.output_name;
                changeMetaInfo({
                  loadUrl: loadUrl,
                  outputName: outputName
                });

                if (!loadUrl) {
                  _context.next = 8;
                  break;
                }

                _context.next = 5;
                return axios.get(loadUrl);

              case 5:
                _yield$axios$get = _context.sent;
                data = _yield$axios$get.data;
                changeSamples(data);

              case 8:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));
      return _loadData.apply(this, arguments);
    }

    loadData();
    return function () {};
  }, []);
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: c.header
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", null, "Sample #", sampleIndex + 1, " / ", samples.length), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("form", {
    method: "GET"
  }, /*#__PURE__*/React.createElement("input", {
    name: "load_url",
    defaultValue: loadUrl
  }), /*#__PURE__*/React.createElement("button", null, "load")))), /*#__PURE__*/React.createElement("div", {
    style: {
      flexGrow: 1
    }
  }), /*#__PURE__*/React.createElement(Button, {
    className: c.button,
    onClick: function onClick() {
      // TODO
      download(JSON.stringify(samples), outputName + ".json", "application/json");
    }
  }, "Download"), /*#__PURE__*/React.createElement(Button, {
    className: c.button,
    onClick: function onClick() {
      return changeSampleIndex((sampleIndex - 1 + samples.length) % samples.length);
    }
  }, "Prev Sample"), /*#__PURE__*/React.createElement(Button, {
    className: c.button,
    variant: "outlined",
    onClick: function onClick() {
      return changeSampleIndex((sampleIndex + 1) % samples.length);
    }
  }, "Next Sample (enter)")), /*#__PURE__*/React.createElement("div", {
    className: c.warning
  }, "This page will not save your progress on refresh."), !loadUrl && /*#__PURE__*/React.createElement("div", {
    className: c.warning
  }, "load_url must be specified"), samples.length > 0 && /*#__PURE__*/React.createElement("div", {
    className: c.content
  }, /*#__PURE__*/React.createElement(NLPAnnotator, Object.assign({
    key: sampleIndex
  }, samples[sampleIndex], {
    onChange: function onChange(answer) {
      var _samples$sampleIndex = samples[sampleIndex],
          type = _samples$sampleIndex.type,
          multiple = _samples$sampleIndex.multiple;
      var prop = type === "label-document" && multiple ? "initialLabels" : type === "label-document" && !multiple ? "initialLabel" : type === "label-sequence" ? "initialSequence" : type === "transcribe" ? "initialTranscriptionText" : null;

      changeSamples(set(cloneDeep(samples), [sampleIndex, prop], answer));
    }
  }))));
});
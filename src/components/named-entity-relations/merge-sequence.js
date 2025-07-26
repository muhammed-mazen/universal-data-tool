var mergeSequence = function mergeSequence(seq) {
  var newSeq = [];
  var current = [seq[0]];

  for (var i = 1; i < seq.length; i++) {
    if (!current[0].label && !seq[i].label) {
      current.push(seq[i]);
    } else {
      if (
        newSeq.length >= 2 &&
        current[0].label &&
        current[0].label === newSeq[newSeq.length - 2].label &&
        newSeq[newSeq.length - 1].text === " "
      ) {
        let spacer = newSeq.pop(),
          first = newSeq.pop(),
          last = current[0];
        current = [first, spacer, last];
      }
      newSeq.push({
        label: current[0].label,
        text: current.reduce(function(acc, c) {
          return acc + c.text;
        }, ""),
        textId: current[0].textId,
      });

      current = [seq[i]];
    }
  }

  newSeq.push({
    label: current[0].label,
    text: current.reduce(function(acc, c) {
      return acc + c.text;
    }, ""),
    textId: current[0].textId,
  });
  return newSeq;
};

export default mergeSequence;

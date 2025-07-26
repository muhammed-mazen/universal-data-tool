var stringToSequence = function stringToSequence(doc) {
  var sepRe =
    arguments.length > 1 && arguments[1] !== undefined
      ? arguments[1]
      : /[a-zA-ZÀ-ÿ0-9\u0621-\u064A\u0660-\u0669]+/g;

  if (typeof sepRe === "string") {
    sepRe = new RegExp(sepRe);
  }

  var m;
  var indices = [0];

  do {
    m = sepRe.exec(doc);

    if (m) {
      indices.push(m.index);
      indices.push(m.index + m[0].length);
    }
  } while (m);

  indices = indices.concat([doc.length]);
  var result = indices
    .filter(function(_, i) {
      return indices[i] !== indices[i + 1];
    })
    .map(function(_, i) {
      return {
        text: doc.slice(indices[i], indices[i + 1]),
        textId: Math.random()
          .toString(36)
          .slice(-6),
      };
    })
    .filter(function(s) {
      return s.text.length > 0;
    });
  //var arabic = /[\u0600-\u06FF]/;
  // if (arabic.test(doc)) {
  // result = result.reverse();
  // }
  return result;
};

export default stringToSequence;

import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import "./WordSearch.css";

const WordSearch = () => {
  const [data, setData] = useState({});
  const [indication, setIndication] = useState(true);
  const [text, setText] = useState("");
  const [matched, setMatched] = useState([]);
  const matrix = [];

  useEffect(() => {
    getData();
  }, [indication]);

  const getData = async () => {
    await fetch(`http://localhost:3000/puzzle`)
      .then((res) => res.json())
      .then((data) => {
        setData(data[0]);
        setIndication(false);
      });
  };

  const makeMatrix = async () => {
    await data.Alphabet_grid?.map((item) => {
      let word = item.split("");
      matrix.push(word);
    });
  };

  const matchWord = (word) => {
    makeMatrix();

    var count = 0;
    let n = matrix.length;
    let m = matrix[0].length;

    for (var i = 0; i < n; i++) {
      for (var j = 0; j < m; j++) {
        var str = "";

        if (j <= m - word.length) {
          for (let k = 0; k < word.length; k++) {
            str += matrix[i][j + k];
          }

          if (str === word) {
            count++;
          }
        }

        if (i <= n - word.length) {
          str = "";
          for (let k = 0; k < word.length; k++) {
            str += matrix[i + k][j];
          }

          if (str === word) {
            count++;
          }
        }

        if (i <= n - word.length && j <= m - word.length) {
          str = "";
          for (let k = 0; k < word.length; k++) {
            str += matrix[i + k][j + k];
          }

          if (str === word) {
            count++;
          }
        }

        if (i >= word.length && j <= m - word.length) {
          str = "";
          for (let k = 0; k < word.length; k++) {
            str += matrix[i - k][j + k];
          }

          if (str === word) {
            count++;
          }
        }
      }
    }

    if (count >= 1) {
      setMatched([...matched, word]);
      console.log(true);
    } else {
      alert("Word doesn't exist");
    }
  };


  const matchedWords = (word) => {
    let matchedWord = matched.some((item) => item === word)
    return matchedWord
  }

  const getAlphabets = (word) => {
    return word.split("");
  };

  if (indication) {
    return <h1>Loading...</h1>;
  }

  return (
    <div className="main-div">
      <div className="first-div">
        <h1>Search Words</h1>
        {data.find_words.map((item) => (
          <h3 style={{ textDecorationLine : matchedWords(item)  ? "line-through" : "none"}} key={item}>{item}</h3>
        ))}
      </div>

      <div className="second-div">
        <div>
          <input
            type="text"
            onChange={(e) => setText(e.target.value)}
            className="input-box"
          />
          <button onClick={() => matchWord(text)} className="submit-btn">
            Submit
          </button>
        </div>
        <div>
          {data.Alphabet_grid.map((item) => (
            <div className="alpha-div">
              {getAlphabets(item).map((char, index) => (
                <span key={index} className="alpha-span">
                  {char}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WordSearch;
